import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigurationService } from './common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const appConfig: AppConfigurationService = app.get(AppConfigurationService);
  await app.listen(appConfig.port);
}
bootstrap();
