import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
    @Prop()
    id: string;

    @Prop()
    foodtype: string;

    @Prop()
    animal: string;

    @Prop()
    status: OrderStatus;
}
// export interface Order {
//     id: string;
//     foodtype: string;
//     animal: string;
//     status: OrderStatus;
// }

export enum OrderStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export const OrderSchema = SchemaFactory.createForClass(Order)