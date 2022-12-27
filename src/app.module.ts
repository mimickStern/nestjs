import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [
    OrdersModule,
    MongooseModule.forRoot(`mongodb+srv://mickey:Q82AqCSEHJDPiaE7@animal-food.nrpfsbt.mongodb.net/?retryWrites=true&w=majority`),
  ],
})
export class AppModule {}

