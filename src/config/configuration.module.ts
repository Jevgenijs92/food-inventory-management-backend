import { Module } from '@nestjs/common';
import { AppConfigurationModule } from './app/app-configuration.module';

@Module({
  imports: [AppConfigurationModule],
})
export class ConfigurationModule {}
