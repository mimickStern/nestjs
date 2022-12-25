import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { Order, OrderStatus } from './order.schema';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getOrders(filterDto: GetOrdersFilterDto): Order[];
    getOrderById(id: string): Order;
    deleteOrderById(id: string): void;
    updateOrderStatus(id: string, status: OrderStatus): Order;
    createOrder(createOrderDto: CreateOrderDto): Order;
}
