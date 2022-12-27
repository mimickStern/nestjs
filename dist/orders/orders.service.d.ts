import { Order, OrderStatus, OrderDocument } from './order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { Model } from 'mongoose';
export declare class OrdersService {
    private orderModel;
    orders: any;
    constructor(orderModel: Model<OrderDocument>);
    getAllOrders(): Promise<Order[]>;
    getOrdersWithFilter(filterDto: GetOrdersFilterDto): Promise<Order[]>;
    getOrderById(id: string): Promise<Order>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<Order>;
    deleteOrderById(id: string): Promise<Order>;
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
}
