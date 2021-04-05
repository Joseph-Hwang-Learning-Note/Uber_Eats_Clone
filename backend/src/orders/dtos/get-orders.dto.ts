import { CoreOutput } from '@common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Order, OrderStatus } from '../entities/order.entity';

@InputType()
export class GetOrdersInput {
  @Field((is) => OrderStatus, { nullable: true })
  status?: OrderStatus;
}

@ObjectType()
export class GetOrdersOutput extends CoreOutput {
  @Field((is) => [Order], { nullable: true })
  orders?: Order[];
}
