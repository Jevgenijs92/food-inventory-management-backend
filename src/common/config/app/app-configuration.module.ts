import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './app.configuration';
import * as Joi from 'joi';
import { AppConfigurationService } from './app-configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('Food inventory management'),
        APP_ENV: Joi.string().valid('development', 'production').default('development'),
        APP_URL: Joi.string().default('http://localhost:9001'),
        APP_PORT: Joi.number().default(9001),
      }),
    }),
  ],
  providers: [AppConfigurationService],
  exports: [AppConfigurationService],
})
export class AppConfigurationModule {}
