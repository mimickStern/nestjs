import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { OrderStatus } from "../order.schema";

export class GetOrdersFilterDto{
    @IsOptional()
    @IsIn([OrderStatus.OPEN, OrderStatus.IN_PROGRESS, OrderStatus.DONE])
    status: OrderStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string; 
}