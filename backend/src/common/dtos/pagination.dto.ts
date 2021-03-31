import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './output.dto';

@InputType()
export class PaginationInput {
  @Field((is) => Int, { defaultValue: 1 })
  page: number;
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
  @Field((is) => Int, { nullable: true })
  totalPages?: number;

  @Field((is) => Int, { nullable: true })
  totalResults?: number;
}
