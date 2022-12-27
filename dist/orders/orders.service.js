"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const order_schema_1 = require("./order.schema");
const uuid_1 = require("uuid");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrdersService = class OrdersService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async getAllOrders() {
        return this.orderModel.find().exec();
    }
    async getOrdersWithFilter(filterDto) {
        const { status, search } = filterDto;
        let orders = await this.getAllOrders();
        if (status) {
            orders = orders.filter(order => order.status === status);
        }
        if (search) {
            orders = orders.filter(order => order.foodtype.includes(search)
                ||
                    order.animal.includes(search));
        }
        return orders;
    }
    async getOrderById(id) {
        let order = await this.orderModel.findById(id).exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order id no. ${id} not found`);
        }
        return order;
    }
    async updateOrderStatus(id, status) {
        const order = await this.orderModel.findByIdAndUpdate(id);
        if (!order) {
            throw new common_1.NotFoundException(`Order ID ${id} not found`);
        }
        order.status = status;
        return order.save();
    }
    async deleteOrderById(id) {
        const deletedOrder = await this.orderModel.findByIdAndDelete(id);
        if (!deletedOrder) {
            throw new common_1.NotFoundException(`Order ${id} not found`);
        }
        return deletedOrder;
    }
    async createOrder(createOrderDto) {
        const { foodtype, animal } = createOrderDto;
        const createdOrder = new this.orderModel({
            id: (0, uuid_1.v4)(),
            foodtype,
            animal,
            status: order_schema_1.OrderStatus.OPEN
        });
        return createdOrder.save();
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map