import { CoreEntity } from '@common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Category } from '@restaurants/entities/category.entity';
import { Users } from '@users/entities/user.entity';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field((is) => String)
  @Column()
  @IsString()
  name: string;

  @Field((is) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((is) => String)
  @Column()
  @IsOptional()
  @IsString()
  address?: string;

  @Field((is) => Category, { nullable: true })
  @ManyToOne((is) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((is) => Users)
  @ManyToOne((is) => Users, (user) => user.restaurants)
  owner: Users;
}
