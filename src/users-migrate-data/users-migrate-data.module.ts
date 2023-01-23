import { Module } from '@nestjs/common';
import { UsersMigrateDataService } from './users-migrate-data.service';
import { UsersMigrateDataController } from './users-migrate-data.controller';
import { IngredientsModule } from '../ingredients';
import { UsersModule } from '../users';
import { ProductsModule } from '../products';
import { OrdersModule } from '../orders/orders.module';
import { AuthConfigurationModule } from '../common/config/auth';

@Module({
  controllers: [UsersMigrateDataController],
  providers: [UsersMigrateDataService],
  imports: [UsersModule, IngredientsModule, ProductsModule, OrdersModule, AuthConfigurationModule],
})
export class UsersMigrateDataModule {}
