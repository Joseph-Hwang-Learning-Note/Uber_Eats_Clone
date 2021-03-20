import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutput {
  @Field((is) => String, { nullable: true })
  error?: string;

  @Field((id) => Boolean)
  ok: boolean;
}
