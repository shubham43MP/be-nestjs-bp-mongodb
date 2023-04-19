import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors();
  const configService = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setTitle('API Master')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addTag('nest-bp')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const port = configService.get('PORT');
  app.useLogger(app.get(Logger));
  await app.listen(port);
}
bootstrap();
