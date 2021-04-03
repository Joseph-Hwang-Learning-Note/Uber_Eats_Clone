import { CoreEntity } from '@common/entities/core.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('DishChoiceInputType', { isAbstract: true })
@ObjectType()
export class DishChoice {
  @Field((is) => String)
  name: string;

  @Field((is) => Int, { nullable: true })
  extra?: number;
}

@InputType('DishOptionInputType', { isAbstract: true })
@ObjectType()
export class DishOption {
  @Field((is) => String)
  name: string;

  @Field((is) => [DishChoice], { nullable: true })
  choices?: DishChoice[];

  @Field((is) => Int, { nullable: true })
  extra?: number;
}

@InputType('DishInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Field((is) => String)
  @Column()
  @IsString()
  @Length(1, 30)
  name: string;

  @Field((is) => Int)
  @Column()
  @IsNumber()
  price: number;

  @Field((is) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  photo: string;

  @Field((is) => String)
  @Column()
  @IsString()
  @Length(5, 200)
  description: string;

  @Field((is) => Restaurant, { nullable: true })
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;

  @Field((is) => DishOption, { nullable: true })
  @Column({ type: 'json', nullable: true })
  options: DishOption[];
}
