import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService, LocalAuthGuard, SkipAuth } from './common/auth';
import { ApiTags } from '@nestjs/swagger';
import { UsernamePasswordLoginDto } from './users';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: UsernamePasswordLoginDto) {
    return this.authService.login(user);
  }
}
