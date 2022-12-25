import { BadRequestException, PipeTransform } from "@nestjs/common";
import { OrderStatus } from "../order.schema";

export class OrderStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        OrderStatus.OPEN,
        OrderStatus.IN_PROGRESS,
        OrderStatus.DONE,

    ];

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException (`"${value}" is invalid status`);
        }

        return value;
    }

    private isStatusValid (status:any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}