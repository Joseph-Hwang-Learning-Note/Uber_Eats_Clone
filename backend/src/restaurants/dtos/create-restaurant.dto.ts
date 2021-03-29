import { CoreOutput } from '@common/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  'name',
  'coverImg',
  'address',
]) {}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}
