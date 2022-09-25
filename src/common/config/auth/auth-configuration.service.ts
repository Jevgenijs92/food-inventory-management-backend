import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigurationService {
  constructor(private configService: ConfigService) {}

  get jwtSecret(): string {
    return <string>this.configService.get<string>('auth.jwtSecret');
  }

  get jwtRefreshSecret(): string {
    return <string>this.configService.get<string>('auth.jwtRefreshSecret');
  }

  get jwtExpirationTime(): string {
    return <string>this.configService.get<string>('auth.jwtExpirationTime');
  }

  get jwtRefreshExpirationTime(): string {
    return <string>this.configService.get<string>('auth.jwtRefreshExpirationTime');
  }

  get jwtRefreshTokenHashRounds(): number {
    return parseFloat(<string>this.configService.get<string>('auth.jwtRefreshTokenHashRounds'));
  }
}
