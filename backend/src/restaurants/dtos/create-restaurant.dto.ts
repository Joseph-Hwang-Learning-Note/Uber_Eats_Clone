import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@ArgsType()
export class CreateRestaurantDto {
  @Field((is) => String)
  @Length(5, 10)
  @IsString()
  name: string;

  @Field((is) => Boolean)
  @IsBoolean()
  isVegan: boolean;

  @Field((is) => String)
  @IsString()
  address: string;

  @Field((is) => String)
  @IsString()
  ownerName: string;
}
