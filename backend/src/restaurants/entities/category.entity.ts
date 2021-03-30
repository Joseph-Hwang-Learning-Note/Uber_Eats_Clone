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
  @Column({ unique: true })
  @IsString()
  name: string;

  @Field((is) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImg: string;

  @Field((is) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;

  @Field((is) => [Restaurant])
  @OneToMany((is) => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];
}
