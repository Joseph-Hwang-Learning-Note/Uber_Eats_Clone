import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Users } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field((is) => Number)
  userId: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field((is) => Users, { nullable: true })
  user?: Users;
}
