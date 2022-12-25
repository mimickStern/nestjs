import { PipeTransform } from "@nestjs/common";
import { OrderStatus } from "../order.schema";
export declare class OrderStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses: OrderStatus[];
    transform(value: any): any;
    private isStatusValid;
}
