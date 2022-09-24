import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';
import { UsersModule } from '../../users';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
  AuthConfigurationModule,
  AuthConfigurationService,
} from '../config/auth';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    AuthConfigurationModule,
    JwtModule.registerAsync({
      imports: [AuthConfigurationModule],
      useFactory: (authConfigService: AuthConfigurationService) => {
        return {
          secret: authConfigService.jwtSecret,
          signOptions: {
            expiresIn: authConfigService.jwtExpirationTime,
          },
        };
      },
      inject: [AuthConfigurationService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
