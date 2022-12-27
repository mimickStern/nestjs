import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { Order, OrderStatus } from './order.schema';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getOrders(filterDto: GetOrdersFilterDto): Promise<Order[]>;
    getOrderById(response: any, id: string): Promise<any>;
    deleteOrderById(id: string): Promise<{
        message: string;
    }>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<Order>;
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
}
