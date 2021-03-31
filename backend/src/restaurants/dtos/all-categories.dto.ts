import { CoreOutput } from '@common/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '@restaurants/entities/category.entity';

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field((is) => [Category], { nullable: true })
  categories?: Category[];
}
