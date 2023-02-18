import { Module } from '@nestjs/common';
import { AppConfigurationModule } from './common';
import { IngredientsModule } from './ingredients';
import { ProductsModule } from './products';
import { AuthModule, JwtAuthGuard } from './common/auth';
import { UsersModule } from './users';
import { APP_GUARD } from '@nestjs/core';
import { OrdersModule } from './orders/orders.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, './', 'frontend'),
    }),
    AppConfigurationModule,
    AuthModule,
    UsersModule,
    IngredientsModule,
    ProductsModule,
    OrdersModule,
    // UsersMigrateDataModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
