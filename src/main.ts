import {
  BadRequestException,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationError, useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { setupApiCors } from './common/setups/cors.setup';
import { setupApiSwagger } from './common/setups/swagger.setup';
import { setupApiExternalMiddlewares } from './common/setups/middleware.setup';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.ALL }],
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  setupApiSwagger(app);
  setupApiCors(app);
  setupApiExternalMiddlewares(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );
  app.useGlobalInterceptors(new TimeoutInterceptor());

  await app.listen(configService.get('PORT')).then(() => {
    console.log(`====================================`);
    console.log(`🚀 Server listening on the port ${configService.get('PORT')}`);
    console.log(`====================================`);
  });
}

bootstrap().catch((err) => console.error(err));
