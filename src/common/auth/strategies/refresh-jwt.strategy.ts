import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthConfigurationService } from '../../config/auth';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private authConfigService: AuthConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfigService.jwtRefreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken();
    return { userId: payload.sub, username: payload.username, refresh_token: refreshToken(req) };
  }
}
