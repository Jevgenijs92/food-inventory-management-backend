import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { DatabaseProviderModule } from '../common';

@Module({
  imports: [DatabaseProviderModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProviders],
  exports: [...productsProviders],
})
export class ProductsModule {}
