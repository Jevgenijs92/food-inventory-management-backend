import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './common';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [ConfigurationModule, IngredientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
