import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
  @Field((is) => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((is) => String)
  @Column()
  @IsString()
  name: string;

  @Field((is) => Boolean, { defaultValue: true })
  @Column({ default: true })
  @IsOptional()
  @IsBoolean()
  isGood?: boolean;

  @Field((is) => String, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field((is) => String, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  ownerName?: string;

  @Field((is) => String, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  categoryName?: string;
}
