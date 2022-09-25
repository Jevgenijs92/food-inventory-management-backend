import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigurationModule } from './common';
import { IngredientsModule } from './ingredients';
import { ProductsModule } from './products';
import { AuthModule, JwtAuthGuard } from './common/auth';
import { UsersModule } from './users';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AppConfigurationModule, AuthModule, UsersModule, IngredientsModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
