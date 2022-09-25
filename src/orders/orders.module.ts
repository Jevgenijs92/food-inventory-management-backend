import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ordersProviders } from './orders.providers';
import { DatabaseProviderModule } from '../common';
import { ProductsModule } from '../products';

@Module({
  imports: [DatabaseProviderModule, ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders],
})
export class OrdersModule {}
