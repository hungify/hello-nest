import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from '../interfaces/config.interface';

export const setupApiDocs = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .addServer(configService.get<string>('SWAGGER_API_URL') || '/')
      .addSecurity('defaultBearerAuth', {
        description: `Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        type: 'http',
        in: 'header',
      })
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || '/api/docs', app, document);
  }
};
