import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer, ValidationError } from 'class-validator';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { setupApiCors, setupApiDocs } from './common/configs';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: WinstonModule.createLogger(loggerConfig),
  });
  const httpAdapter = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);
  // const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.setGlobalPrefix('api', {
    exclude: [],
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  setupApiDocs(app);
  setupApiCors(app);

  app.use(morgan('dev'));
  app.use(cookieParser());

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
    console.info(`=================================`);
    console.info(`🚀 App listening on the port ${configService.get('PORT')}`);
    console.info(`🎮 Url: http://localhost:${configService.get('PORT')}`);
    console.info(`=================================`);
  });
}

bootstrap().catch((err) => console.error('Error: ', err));
