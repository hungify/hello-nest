import type { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

export const setupApiMiddlewares = (app: INestApplication) => {
  app.use(morgan('dev'));
  app.use(cookieParser());
};
