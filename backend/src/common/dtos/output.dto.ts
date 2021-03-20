import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MutationOutput {
  @Field((is) => String, { nullable: true })
  error?: string;

  @Field((id) => Boolean)
  ok: boolean;
}
