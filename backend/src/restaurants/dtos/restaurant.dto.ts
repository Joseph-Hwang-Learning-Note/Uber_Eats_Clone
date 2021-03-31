import { CoreOutput } from '@common/dtos/output.dto';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '@restaurants/entities/restaurant.entity';

@InputType()
export class RestaurantInput {
  @Field((is) => Int)
  restaurantId: number;
}

@ObjectType()
export class RestaurantOutput extends CoreOutput {
  @Field((is) => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}
