import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseConfigurationModule } from '../../config/database/database-configuration.module';

@Module({
  imports: [DatabaseConfigurationModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseProviderModule {}
