import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';
import { UsersModule } from '../../users';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfigurationModule } from '../config/auth';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule, AuthConfigurationModule, JwtModule.register({})],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
