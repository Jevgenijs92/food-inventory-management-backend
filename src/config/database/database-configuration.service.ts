import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigurationService {
  constructor(private configService: ConfigService) {}

  get uri(): string {
    return <string>this.configService.get<string>('database.uri');
  }
}
