import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @Field((is) => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((is) => String)
  @Column()
  name: string;

  @Field((is) => Boolean, { nullable: true })
  @Column()
  isGood?: boolean;

  @Field((is) => String)
  @Column()
  address: string;

  @Field((is) => String)
  @Column()
  ownerName: string;

  @Field((is) => String)
  @Column()
  categoryName: string;
}
