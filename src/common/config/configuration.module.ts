import { Module } from '@nestjs/common';
import { AppConfigurationModule } from './app';
import { DatabaseConfigurationModule } from './database';
import { AuthConfigurationModule } from './auth';

@Module({
  imports: [AppConfigurationModule, DatabaseConfigurationModule, AuthConfigurationModule],
})
export class ConfigurationModule {}
