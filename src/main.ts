import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigurationService } from './common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Food inventory management')
    .setDescription('APIs for food inventory management system')
    .setVersion('1.0')
    .addTag('Food inventory management system')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const appConfig: AppConfigurationService = app.get(AppConfigurationService);
  await app.listen(appConfig.port);
}
bootstrap();
