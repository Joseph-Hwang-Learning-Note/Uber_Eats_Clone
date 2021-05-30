import {
  NEW_COOKED_ORDER,
  NEW_ORDER_UPDATE,
  NEW_PENDING_ORDERS,
  PUB_SUB,
} from '@common/common.constants';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from '@restaurants/entities/dish.entity';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { UserRole, Users } from '@users/entities/user.entity';
import { PubSub } from 'graphql-subscriptions';
import { Repository } from 'typeorm';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { TakeOrderInput, TakeOrderOutput } from './dtos/take-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(Dish)
    private readonly dishes: Repository<Dish>,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  async createOrder(
    customer: Users,
    { restaurantId, items }: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    try {
      const restaurant = await this.restaurants.findOne(restaurantId);
      if (!restaurant) return { ok: false, error: 'Restaurant not found' };
      const order = await this.orders.save(
        this.orders.create({ customer, restaurant }),
      );
      let orderFinalPrice = 0;
      const orderItems: OrderItem[] = [];
      for (const item of items) {
        // You can't return inside of forEach
        const dish = await this.dishes.findOne(item.dishId);
        if (!dish) return { ok: false, error: 'Dish not found' };
        let dishFinalPrice = dish.price;
        for (const itemOption of item.options) {
          const dishOption = dish.options.find(
            (dishOption) => dishOption.name === itemOption.name,
          );
          if (dishOption) {
            if (dishOption.extra) {
              dishFinalPrice += dishOption.extra;
            } else {
              const dishOptionChoice = dishOption.choices.find(
                (optionChoice) => optionChoice.name === itemOption.name,
              );
              if (dishOptionChoice && dishOptionChoice.extra) {
                dishFinalPrice += dishOptionChoice.extra;
              }
            }
          }
        }
        orderFinalPrice += dishFinalPrice;
        const order = await this.orderItems.save(
          this.orderItems.create({ dish, options: item.options }),
        );
        await this.pubSub.publish(NEW_PENDING_ORDERS, {
          pendingOrders: { order, ownerId: restaurant.ownerId },
        });
        return { ok: true };
      }
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getOrders(
    user: Users,
    { status }: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    try {
      let orders: Order[];
      if (user.role === UserRole.Client) {
        orders = await this.orders.find({
          where: { customer: user, ...(status && { status }) },
        });
      } else if (user.role === UserRole.Delivery) {
        orders = await this.orders.find({
          where: { driver: user, ...(status && { status }) },
        });
      } else if (user.role === UserRole.Owner) {
        const restaurants = await this.restaurants.find({
          where: { owner: user },
          relations: ['orders'],
        });
        orders = restaurants.map((restaurant) => restaurant.orders).flat(1);
        if (status) {
          orders = orders.filter((order) => order.status === status);
        }
      }
      return { ok: true, orders };
    } catch (error) {
      return { ok: false, error: 'Could not get orders' };
    }
  }

  canSeeOrder(user: Users, order: Order): boolean {
    let canSee = true;
    if (user.role === UserRole.Client && order.customerId !== user.id) {
      canSee = false;
    }
    if (user.role === UserRole.Delivery && order.driverId !== user.id) {
      canSee = false;
    }
    if (user.role === UserRole.Owner && order.restaurant.ownerId !== user.id) {
      canSee = false;
    }
    return canSee;
  }

  async getOrder(
    user: Users,
    { id: orderId }: GetOrderInput, // rename it like this
  ): Promise<GetOrderOutput> {
    try {
      const order = await this.orders.findOne(orderId, {
        relations: ['restaurant'],
      });
      if (!order) return { ok: false, error: 'Order not found' };
      if (!this.canSeeOrder(user, order)) {
        return { ok: false, error: "You can't see it" };
      }
      return { ok: true, order };
    } catch (error) {
      return { ok: false, error: 'Could not load order' };
    }
  }

  async editOrder(
    user: Users,
    { id: orderId, status }: EditOrderInput,
  ): Promise<EditOrderOutput> {
    try {
      const order = await this.orders.findOne(orderId, {
        relations: ['restaurant'],
      });
      if (!order) return { ok: false, error: 'Order not found' };
      if (!this.canSeeOrder(user, order)) {
        return { ok: false, error: "Can't edit it" };
      }
      let canEdit = true;
      if (user.role === UserRole.Client) canEdit = false;
      if (user.role === UserRole.Owner) {
        if (status !== OrderStatus.Cooking && status !== OrderStatus.Cooked) {
          canEdit = false;
        }
      }
      if (user.role === UserRole.Delivery) {
        if (
          status !== OrderStatus.PickedUp &&
          status !== OrderStatus.Delivered
        ) {
          canEdit = false;
        }
      }
      if (!canEdit) return { ok: false, error: "You can't change this" };
      await this.orders.save([{ id: orderId, status }]);
      const newOrder = { ...order, status };
      if (user.role === UserRole.Owner) {
        if (status === OrderStatus.Cooked) {
          await this.pubSub.publish(NEW_COOKED_ORDER, {
            cookedOrders: newOrder,
          });
        }
      }
      await this.pubSub.publish(NEW_ORDER_UPDATE, { orderUpdates: newOrder });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Can't edit it" };
    }
  }

  async takeOrder(
    driver: Users,
    { id: orderId }: TakeOrderInput,
  ): Promise<TakeOrderOutput> {
    try {
      const order = await this.orders.findOne(orderId);
      if (!order) {
        return {
          ok: false,
          error: 'Order not found',
        };
      }
      if (order.driver) {
        return {
          ok: false,
          error: 'This order already has a driver',
        };
      }
      await this.orders.save({
        id: orderId,
        driver,
      }); // Put it into array if you want to see auto complete supported by typescript
      await this.pubSub.publish(NEW_ORDER_UPDATE, {
        orderUpdates: { ...order, driver },
      });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not update order.',
      };
    }
  }
}
