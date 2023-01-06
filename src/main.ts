import {
  BadRequestException,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer, ValidationError } from 'class-validator';
import { setupApiCors, setupApiDocs } from './common/configs';
import { setupApiMiddlewares } from './common/configs/middleware.config';
import { AllExceptionsFilter } from './common/filters';
import {
  TimeoutInterceptor,
  WrapResponseInterceptor,
} from './common/interceptors';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: WinstonModule.createLogger(loggerConfig),
  });
  const httpAdapter = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);
  // const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.ALL }],
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  setupApiDocs(app);
  setupApiCors(app);
  setupApiMiddlewares(app);

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
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  await app.listen(configService.get('PORT')).then(() => {
    console.log(`====================================`);
    console.log(`🚀 Server listening on the port ${configService.get('PORT')}`);
    console.log(`====================================`);
  });
}

bootstrap().catch((err) => console.error('Error: ', err));
