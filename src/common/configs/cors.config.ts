import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CorsConfig } from '../interfaces/config.interface';

export const setupApiCors = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const corsConfig = configService.get<CorsConfig>('cors');

  if (corsConfig.enabled) {
    app.enableCors();
  }
};
