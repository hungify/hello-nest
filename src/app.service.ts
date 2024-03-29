import { Injectable } from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AppService {
  welcome(req: Request): Record<string, string> {
    return {
      title: 'Welcome to NestJS API Stater',
      content: 'Redirect to /api/docs for API documentation',
      link: `${req.protocol}://${req.get('Host')}${req.originalUrl}api/docs`,
    };
  }
}
