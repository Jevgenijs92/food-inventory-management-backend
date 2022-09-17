import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule, DatabaseProviderModule } from './common';

@Module({
  imports: [ConfigurationModule, DatabaseProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
