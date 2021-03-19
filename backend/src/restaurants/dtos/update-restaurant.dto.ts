import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './create-restaurant.dto';

@InputType() // Argument should have a name
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}

@ArgsType() // Argument should NOT have a name
export class UpdateRestaurantDto {
  @Field((is) => Number)
  id: number;

  @Field((is) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
