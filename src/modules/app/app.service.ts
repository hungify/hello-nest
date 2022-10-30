import { Injectable } from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AppService {
  welcome(req: Request): unknown {
    return {
      title: 'Welcome to NestJS API Stater',
      content: 'Redirect to /docs for API documentation',
      link: `${req.protocol}://${req.get('Host')}${req.originalUrl}api/docs`,
    };
  }
}
