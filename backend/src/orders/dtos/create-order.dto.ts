import { CoreOutput } from '@common/dtos/output.dto';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { DishOption } from '@restaurants/entities/dish.entity';

@InputType()
class CreateOrderItemInput {
  @Field((is) => Int)
  dishId: number;

  @Field((is) => [DishOption], { nullable: true })
  options?: DishOption[];
}

@InputType()
export class CreateOrderInput {
  @Field((is) => Int)
  restaurantId: number;

  @Field((is) => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
