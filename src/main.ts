import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigurationService } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigurationService = app.get(AppConfigurationService);
  await app.listen(appConfig.port);
}
bootstrap();
