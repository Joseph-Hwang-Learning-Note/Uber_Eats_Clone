import { CoreEntity } from '@common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Category } from '@restaurants/entities/category.entity';
import { Users } from '@users/entities/user.entity';
import { Dish } from './dish.entity';
import { Order } from '@src/orders/entities/order.entity';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field((is) => String)
  @Column()
  @IsString()
  @Length(1, 50)
  name: string;

  @Field((is) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((is) => String)
  @Column()
  @IsOptional()
  @IsString()
  address?: string;

  @Field((is) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((is) => Users)
  @ManyToOne((type) => Users, (user) => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: Users;

  @Field((is) => [Order])
  @OneToMany((type) => Order, (order) => order.customer)
  orders: Order[];

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  @Field((is) => [Dish])
  @OneToMany((type) => Dish, (dish) => dish.restaurant)
  menu: Dish[];

  @Field((is) => Boolean)
  @Column({ default: false })
  isPromoted: boolean;

  @Field((is) => Date, { nullable: true })
  @Column({ nullable: true })
  promotedUntil: Date;
}
