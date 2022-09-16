import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/configuration.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [ConfigurationModule, ProvidersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
