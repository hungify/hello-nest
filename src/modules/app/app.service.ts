import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { HttpConfig } from '~/common/interfaces';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  welcome(): unknown {
    const { host, port } = this.configService.get<HttpConfig>('http');
    return {
      title: 'Welcome to NestJS API Stater',
      content: 'Redirect to /docs for API documentation',
      link: `http://${host}:${port}/api/docs`,
    };
  }
}
