import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BadRequestExceptionFilter } from './exception-filters/bad-request.filter';
import { EntityConflictExceptionFilter } from './exception-filters/entity-conflict.filter';
import { EntityNotFoundExceptionFilter } from './exception-filters/entity-not-found.filter';

const bootstrap = async () => {
  const logger = new Logger('MainApi');

  logger.verbose(`Iniciando a aplicação 🚀`);

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['debug', 'verbose', 'error', 'warn'],
  });

  app.useGlobalFilters(
    new EntityNotFoundExceptionFilter(),
    new EntityConflictExceptionFilter(),
    new BadRequestExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.setGlobalPrefix('/v1/api');

  const config = new DocumentBuilder()
    .setTitle('WEB API - Boilerplate')
    .setDescription('API responsável: Yan Almeida')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 3001);
  const url = await app.getUrl();

  logger.debug(`Swagger application is running on: ${url}/swagger`);
};

bootstrap();
