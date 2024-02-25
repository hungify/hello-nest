import { AppConfig } from '~/common/types/config.type';
import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupApiSwagger = (app: INestApplication) => {
  const configService = app.get(ConfigService<AppConfig>);
  const swaggerConfig = configService.get('swagger', { infer: true });

  if (swaggerConfig.isEnabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
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

    SwaggerModule.setup(swaggerConfig.path, app, document, {
      swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
        persistAuthorization: true,
      },
    });
  }
};
