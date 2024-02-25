import { AppConfig } from '~/common/types/config.type';
import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const setupApiCors = (app: INestApplication) => {
  const configService = app.get(ConfigService<AppConfig>);
  const { isEnabled, origin } = configService.get('cors', { infer: true });

  app.enableCors({
    origin: isEnabled ? origin : '*',
  });
};
