import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/exception-filter';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  const localOrigin = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
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
