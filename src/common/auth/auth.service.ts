import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';
import { AuthConfigurationService } from '../config/auth';
import { AuthToken } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authConfigService: AuthConfigurationService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password) {
      const validPassword = await bcrypt.compare(pass, user.password);
      if (validPassword) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async login(userDto: any) {
    const user = await this.usersService.findOneByUsername(userDto.username);
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (user && user.refresh_token && refreshToken === user.refresh_token) {
      const tokens = await this.getTokens(user.id, user.username);
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    }
    throw new UnauthorizedException();
  }

  async logout(userId: string) {
    await this.updateRefreshToken(userId, null);
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    return this.usersService.updateRefreshToken(userId, refreshToken);
  }

  async getTokens(userId: string, username: string): Promise<AuthToken> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.authConfigService.jwtSecret,
          expiresIn: this.authConfigService.jwtExpirationTime,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.authConfigService.jwtRefreshSecret,
          expiresIn: this.authConfigService.jwtRefreshExpirationTime,
        },
      ),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
}
