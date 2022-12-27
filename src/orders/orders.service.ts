import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, OrderStatus, OrderSchema, OrderDocument } from './order.schema';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
    orders: any;
    constructor(@InjectModel(Order.name) private  orderModel: Model<OrderDocument>){}
    

    async getAllOrders(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async getOrdersWithFilter(filterDto: GetOrdersFilterDto): Promise<Order[]> {
        const {status, search} = filterDto;

        let orders = await this.getAllOrders();
        
        if (status) {
            orders =  orders.filter(order => order.status === status);
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

    async getOrderById(id: string): Promise<Order> {
        let order = await this.orderModel.findById(id).exec();
         if (!order) {
            throw new NotFoundException(`Order id no. ${id} not found`);
         }
         return order;
    }

    async updateOrderStatus(id: string, status: OrderStatus): Promise<Order>{
        const order = await this.orderModel.findByIdAndUpdate(id);
        if (!order){
            throw new NotFoundException(`Order ID ${id} not found`);
        }
        order.status = status;
        return order.save();
    }

    async deleteOrderById(id: string): Promise<Order> {
        const deletedOrder = await this.orderModel.findByIdAndDelete(id);
        if (!deletedOrder){
            throw new NotFoundException(`Order ${id} not found`);
        }
        return deletedOrder
    }

    // Using DTO
    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const {foodtype, animal} = createOrderDto;

        const createdOrder = new this.orderModel({
            id:uuidv4(),
            foodtype,
            animal,
            status:OrderStatus.OPEN

        });
        return createdOrder.save()
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
