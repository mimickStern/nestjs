"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const order_schema_1 = require("../order.schema");
class OrderStatusValidationPipe {
    constructor() {
        this.allowedStatuses = [
            order_schema_1.OrderStatus.OPEN,
            order_schema_1.OrderStatus.IN_PROGRESS,
            order_schema_1.OrderStatus.DONE,
        ];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`"${value}" is invalid status`);
        }
        return value;
    }
    isStatusValid(status) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}
exports.OrderStatusValidationPipe = OrderStatusValidationPipe;
//# sourceMappingURL=order-status-validation.pipe.js.map