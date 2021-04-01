import { CoreEntity } from '@common/entities/core.entity';
import {
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Dish } from '@restaurants/entities/dish.entity';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { Users } from '@users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Order extends CoreEntity {
  @Field((is) => Users, { nullable: true })
  @ManyToOne((type) => Users, (user) => user.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customer?: Users;

  @Field((is) => Users, { nullable: true })
  @ManyToOne((type) => Users, (user) => user.rides, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  driver?: Users;

  @Field((is) => Restaurant)
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  restaurant: Restaurant;

  @Field((is) => [Dish])
  @ManyToMany((type) => Dish)
  @JoinTable()
  dishes: Dish[];

  @Field((is) => Float)
  @Column()
  total: number;

  @Field((is) => OrderStatus)
  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;
}
