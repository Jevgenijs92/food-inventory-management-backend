import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService, LocalAuthGuard, SkipAuth } from './common/auth';
import { ApiTags } from '@nestjs/swagger';
import { RefreshJwtAuthGuard } from './common/auth/guards/refresh-jwt-auth.guard';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

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
}
