import { v4 as uuidv4 } from 'uuid';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Users } from '@users/entities/user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field((is) => String)
  code: string;

  @OneToOne((is) => Users, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;

  @BeforeInsert()
  createCode(): void {
    // Math.random.toString(36).substring(2) # Generates short random string
    // But we're gonna use uuid
    this.code = uuidv4();
  }
}
