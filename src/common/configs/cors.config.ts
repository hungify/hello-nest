import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CorsConfig } from '../interfaces/config.interface';

export const setupApiCors = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const { isEnabled, origin } = configService.get<CorsConfig>('cors');

  app.enableCors({
    origin: isEnabled ? origin : '*',
  });
};
