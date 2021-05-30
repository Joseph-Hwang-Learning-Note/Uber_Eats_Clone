import { CoreEntity } from '@common/entities/core.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { Users } from '@users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@InputType('PaymentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity {
  @Field((is) => Int)
  @Column()
  transactionId: number;

  @Field((is) => Users)
  @ManyToOne((type) => Users, (user) => user.payments)
  user?: Users;

  @RelationId((order: Payment) => order.user)
  userId: number;

  @Field((is) => Restaurant)
  @ManyToOne((type) => Restaurant)
  restaurant: Restaurant;

  @Field((is) => Int)
  @RelationId((payment: Payment) => payment.restaurant)
  restaurantId: number;
}
