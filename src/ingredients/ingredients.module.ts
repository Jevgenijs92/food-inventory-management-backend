import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { ingredientsProviders } from './ingredients.providers';
import { DatabaseProviderModule } from '../common';
import { ProductsModule } from '../products';

@Module({
  imports: [DatabaseProviderModule, ProductsModule],
  controllers: [IngredientsController],
  providers: [IngredientsService, ...ingredientsProviders],
})
export class IngredientsModule {}
