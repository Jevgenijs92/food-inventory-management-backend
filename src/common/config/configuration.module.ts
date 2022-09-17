import { Module } from '@nestjs/common';
import { AppConfigurationModule } from './app';
import { DatabaseConfigurationModule } from './database';

@Module({
  imports: [AppConfigurationModule, DatabaseConfigurationModule],
})
export class ConfigurationModule {}
