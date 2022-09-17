import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigurationService {
  constructor(private configService: ConfigService) {}

  get name(): string {
    return <string>this.configService.get<string>('app.name');
  }

  get env(): string {
    return <string>this.configService.get<string>('app.env');
  }
  get url(): string {
    return <string>this.configService.get<string>('app.url');
  }
  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }
}
