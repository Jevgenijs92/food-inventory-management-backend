import { Body, Controller, HttpCode, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SkipAuth } from './decorators';
import { LocalAuthGuard, RefreshJwtAuthGuard } from './guards';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  private readonly logger = new Logger(AuthController.name);

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(200)
  async login(@Body() user: any) {
    return this.authService.login(user);
  }

  @SkipAuth()
  @UseGuards(RefreshJwtAuthGuard)
  @Post('auth/refresh')
  @HttpCode(200)
  async refresh(@Req() req: any) {
    return this.authService.refreshTokens(req.user.userId, req.user.refresh_token);
  }

  @Post('auth/logout')
  @HttpCode(200)
  async logout(@Req() req: any) {
    return this.authService.logout(req.user.userId);
  }

  @SkipAuth()
  @Post('auth/register')
  async register(@Req() req: any) {
    this.logger.log('New user registration attempt: ' + req.body.username);
    return this.authService.register(req.body);
  }
}
