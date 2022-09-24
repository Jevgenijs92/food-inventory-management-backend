import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthConfigurationService } from './auth-configuration.service';
import authConfiguration from './auth.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfiguration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().default('secret'),
        JWT_EXPIRATION_TIME: Joi.number().default(60),
      }),
    }),
  ],
  providers: [AuthConfigurationService],
  exports: [AuthConfigurationService],
})
export class AuthConfigurationModule {}
