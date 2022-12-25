import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, OrderStatus, OrderSchema, OrderDocument } from './order.schema';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orders: Order[] = [], orderModel: Model<OrderDocument>){}
    

    getAllOrders(): Order[] {
        return this.orders;
    }

    getOrdersWithFilter(filterDto: GetOrdersFilterDto): Order[] {
        const {status, search} = filterDto;

        let orders = this.getAllOrders();
        
        if (status) {
            orders = orders.filter(order => order.status === status);
        }

        // filter by substring
        if (search) {
            orders = orders.filter(order => 
                order.foodtype.includes(search) 
                ||
                order.animal.includes(search),
                );
        }
        
        return orders
    }

    getOrderById(id: string): Order {
        const found = this.orders.find(order => order.id === id);
         if (!found) {
            throw new NotFoundException(`Order id no. ${id} not found`);
         }
         return found;
    }

    updateOrderStatus(id: string, status: OrderStatus): Order{
        const order = this.getOrderById(id);
        order.status = status;
        return order;
    }

    deleteOrderById(id: string): void {
        const found = this.getOrderById(id);
        this.orders = this.orders.filter(order => order.id !== found.id);
    }

    // Using DTO
    createOrder(createOrderDto: CreateOrderDto): Order {
        const {foodtype, animal} = createOrderDto;

        const order: Order = {
            id:uuidv4(),
            foodtype,
            animal,
            status:OrderStatus.OPEN
        };

        this.orders.push(order);
        return order;
    }

    // Regular Way
    // createOrder(foodtype:string, animal:string): Order {
    //     const order: Order = {
    //         id:uuidv4(),
    //         foodtype,
    //         animal,
    //         status:OrderStatus.OPEN
    //     };

    //     this.orders.push(order);
    //     return order;
    // }
}
