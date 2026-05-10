import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationConstants } from './constants';
import { setupSwagger } from './config/swagger.config';
import { GlobalExceptionFilter } from './common/filters';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: true,
      colors: true,
    }),
  });

  app.use(helmet());

  // Global Exception Filter - catches all exceptions
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(new ValidationPipe(validationConstants));
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
