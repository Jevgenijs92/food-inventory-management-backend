import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigurationService {
  constructor(private configService: ConfigService) {}

  get jwtSecret(): string {
    return <string>this.configService.get<string>('auth.jwtSecret');
  }

  get jwtExpirationTime(): number {
    return parseFloat(
      <string>this.configService.get<string>('auth.jwtExpirationTime'),
    );
  }
}
