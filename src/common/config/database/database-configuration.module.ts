import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfiguration from './database.configuration';
import * as Joi from 'joi';
import { DatabaseConfigurationService } from './database-configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfiguration],
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string(),
      }),
    }),
  ],
  providers: [DatabaseConfigurationService],
  exports: [DatabaseConfigurationService],
})
export class DatabaseConfigurationModule {}
