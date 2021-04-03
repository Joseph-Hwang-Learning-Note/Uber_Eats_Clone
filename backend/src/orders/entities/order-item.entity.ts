import { CoreEntity } from '@common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Dish, DishChoice } from '@restaurants/entities/dish.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('OrderItemOptionInputType', { isAbstract: true })
@ObjectType()
export class OrderItemOption {
  @Field((is) => String)
  name: string;

  @Field((is) => DishChoice, { nullable: true })
  choice?: DishChoice;
}

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  @Field((is) => Dish)
  @ManyToOne((type) => Dish, { nullable: true, onDelete: 'CASCADE' }) // We don't need to get this from dish, but need the opposite
  dish: Dish;

  @Field((is) => [OrderItemOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: OrderItemOption[];
}
