import { OrderStatus } from "../order.schema";
export declare class GetOrdersFilterDto {
    status: OrderStatus;
    search: string;
}
