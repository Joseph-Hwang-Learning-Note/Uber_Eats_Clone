import { PaginationInput, PaginationOutput } from '@common/dtos/pagination.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '@restaurants/entities/restaurant.entity';

@InputType()
export class RestaurantsInput extends PaginationInput {}

@ObjectType()
export class RestaurantsOutput extends PaginationOutput {
  @Field((is) => [Restaurant], { nullable: true })
  results?: Restaurant[];
}
