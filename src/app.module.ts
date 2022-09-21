import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './common';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigurationModule, IngredientsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
