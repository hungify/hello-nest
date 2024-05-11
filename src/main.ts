import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { setupApiCors } from './common/setups/cors.setup';
import { setupApiExternalMiddlewares } from './common/setups/middleware.setup';
import { setupApiSwagger } from './common/setups/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.enableVersioning();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  setupApiSwagger(app);
  setupApiCors(app);
  setupApiExternalMiddlewares(app);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new UnprocessableEntityException(result);
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(configService.get('PORT')).then(() => {
    console.log(`====================================`);
    console.log(`🚀 Server listening on the port ${configService.get('PORT')}`);
    console.log(`====================================`);
  });
}

bootstrap().catch((err) => console.error(err));
