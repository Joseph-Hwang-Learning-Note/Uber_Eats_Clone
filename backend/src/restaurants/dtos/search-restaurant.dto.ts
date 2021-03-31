import { PaginationInput, PaginationOutput } from '@common/dtos/pagination.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '@restaurants/entities/restaurant.entity';

@InputType()
export class SearchRestaurantInput extends PaginationInput {
  @Field((is) => String)
  query: string;
}

@ObjectType()
export class SearchRestaurantOutput extends PaginationOutput {
  @Field((is) => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}
