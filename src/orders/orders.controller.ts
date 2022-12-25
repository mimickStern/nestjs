import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { Order, OrderStatus } from './order.schema';
import { OrdersService } from './orders.service';
import { OrderStatusValidationPipe } from './pipes/order-status-validation.pipe';

@Controller('orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}

    @Get()
    getOrders(@Query(ValidationPipe) filterDto: GetOrdersFilterDto): Order[] {
        if (Object.keys(filterDto).length){
            return this.ordersService.getOrdersWithFilter(filterDto);
        } else {
            return this.ordersService.getAllOrders();
        }
        
    }


    @Get('/:id')
    getOrderById(@Param('id') id: string): Order {
        return this.ordersService.getOrderById(id);
    }

    @Delete('/:id')
    deleteOrderById(@Param('id') id: string): void {
        this.ordersService.deleteOrderById(id);
    }

    @Patch('/:id/status')
    updateOrderStatus(
        @Param('id') id:string,
        @Body ('status', OrderStatusValidationPipe) status: OrderStatus,
        ): Order {
        return this.ordersService.updateOrderStatus(id, status);
    }

    // Using DTO
    @Post()
    @UsePipes(ValidationPipe)
    createOrder(@Body() createOrderDto: CreateOrderDto): Order {
        return this.ordersService.createOrder(createOrderDto);
    }

    // regular way (without DTO)
    //@Post()
    // createOrder(
    //     @Body('foodtype') foodtype: string,
    //     @Body('animal') animal: string,
    //     ): Order 
    //     {
    //     return this.ordersService.createOrder(foodtype,animal);
    // }
} 
