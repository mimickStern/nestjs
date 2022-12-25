import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [
    OrdersModule,
    MongooseModule.forRoot(`mongodb+srv://mickey:300583Ms@cluster0.genvem9.mongodb.net/?retryWrites=true&w=majority`)
  ],
})
export class AppModule {}
