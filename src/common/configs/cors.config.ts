import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CorsConfig } from '../interfaces/config.interface';

export const setupApiCors = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const { enabled, origin } = configService.get<CorsConfig>('cors');

  app.enableCors({
    origin: enabled ? origin : '*',
  });
};
