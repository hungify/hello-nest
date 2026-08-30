import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  welcome(req: Request): Record<string, string> {
    const swaggerPath = this.configService.get<string>('swagger.path', {
      infer: true,
    });
    const host =
      this.configService.get<string>('http.host', { infer: true }) ||
      req.get('Host');
    const port = this.configService.get<number>('http.port', { infer: true });
    const protocol = req.protocol;
    const link =
      port && port !== 80 && port !== 443
        ? `${protocol}://${host}:${port}${swaggerPath}`
        : `${protocol}://${host}${swaggerPath}`;

    return {
      title: 'Welcome to NestJS API Stater',
      content: `Redirect to ${swaggerPath} for API documentation`,
      link,
    };
  }
}
