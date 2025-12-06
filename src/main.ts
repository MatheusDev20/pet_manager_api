import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/exception-filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './modules/prisma/prisma.service';

import cookieParser from 'cookie-parser';
import { LogInterceptor } from './shared/interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  const localOrigin = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

  const config = new DocumentBuilder()
    .setTitle('Pets Manager API')
    .setDescription(
      'API for managing pets, their owners and future appointments',
    )
    .setVersion('1.0')
    .addTag('pets')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.useGlobalInterceptors(new LogInterceptor(app.get(PrismaService)));

  app.use(cookieParser());
  if (process.env.NODE_ENV === 'production') {
    app.enableCors();
  } else app.enableCors(localOrigin);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => console.log('Application is running!'))
  .catch((err) => {
    console.error('Failed to start application:', err);
  });
