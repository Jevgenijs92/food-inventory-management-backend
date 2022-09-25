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
        JWT_REFRESH_SECRET: Joi.string().default('refresh_secret'),
        JWT_EXPIRATION_TIME: Joi.string().default('10m'),
        JWT_REFRESH_EXPIRATION_TIME: Joi.string().default('1d'),
        JWT_REFRESH_TOKEN_HASH_ROUNDS: Joi.number().default(10),
      }),
    }),
  ],
  providers: [AuthConfigurationService],
  exports: [AuthConfigurationService],
})
export class AuthConfigurationModule {}
