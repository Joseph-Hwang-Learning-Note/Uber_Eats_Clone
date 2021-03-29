import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '@common/entities/core.entity';
import { Restaurant } from './restaurant.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Field((is) => String)
  @Column()
  @IsString()
  name: string;

  @Field((is) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((is) => [Restaurant])
  @OneToMany((is) => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];
}
