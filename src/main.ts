import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { setupApiCors, setupApiDocs } from './common/configs';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: WinstonModule.createLogger(loggerConfig),
  });
  app.setGlobalPrefix('api', {
    exclude: [],
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);
  // const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

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
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
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
