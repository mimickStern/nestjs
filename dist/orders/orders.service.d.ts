import { Order, OrderStatus, OrderDocument } from './order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { Model } from 'mongoose';
export declare class OrdersService {
    private orders;
    constructor(orders: Order[], orderModel: Model<OrderDocument>);
    getAllOrders(): Order[];
    getOrdersWithFilter(filterDto: GetOrdersFilterDto): Order[];
    getOrderById(id: string): Order;
    updateOrderStatus(id: string, status: OrderStatus): Order;
    deleteOrderById(id: string): void;
    createOrder(createOrderDto: CreateOrderDto): Order;
}
