import { Module } from '@nestjs/common';
import { AppConfigurationModule } from './app/app-configuration.module';
import { DatabaseConfigurationModule } from './database/database-configuration.module';

@Module({
  imports: [AppConfigurationModule, DatabaseConfigurationModule],
})
export class ConfigurationModule {}
