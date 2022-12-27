import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { Order, OrderStatus } from './order.schema';
import { OrdersService } from './orders.service';
import { OrderStatusValidationPipe } from './pipes/order-status-validation.pipe';

@Controller('orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}

    @Get()
    async getOrders(@Query(ValidationPipe) filterDto: GetOrdersFilterDto){
        if (Object.keys(filterDto).length){
            return this.ordersService.getOrdersWithFilter(filterDto);
        } else {
            return this.ordersService.getAllOrders();
        }
        
    }


    @Get('/:id')
    async getOrderById (@Res() response, @Param('id') id: string) {
        
            const order = await this.ordersService.getOrderById(id);
            return response.status(HttpStatus.OK).json({
                message:`Order ID ${id} successfully found`, 
                order:order
            });
         }

    @Delete('/:id')
    async deleteOrderById(@Param('id') id: string) {
        this.ordersService.deleteOrderById(id);
        return {message: `Order ${id} deleted`}
    }

    @Patch('/:id/status')
    async updateOrderStatus(
        @Param('id') id:string,
        @Body ('status', OrderStatusValidationPipe) status: OrderStatus,
        ): Promise<Order> {
        return this.ordersService.updateOrderStatus(id, status);
    }

    // Using DTO
    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
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
