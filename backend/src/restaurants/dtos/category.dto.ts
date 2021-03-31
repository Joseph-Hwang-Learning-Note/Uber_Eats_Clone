import { PaginationInput, PaginationOutput } from '@common/dtos/pagination.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Category } from '@restaurants/entities/category.entity';

@InputType()
export class CategoryInput extends PaginationInput {
  @Field((is) => String)
  slug: string;
}

@ObjectType()
export class CategoryOutput extends PaginationOutput {
  @Field((is) => Category, { nullable: true })
  category?: Category;
}
