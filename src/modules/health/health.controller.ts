import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { AppConfig, HttpConfig } from '~/common/types/config.type';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private configService: ConfigService<AppConfig>,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const { host, port } = this.configService.get<HttpConfig>('http');
    const url = `http://${host}:${port}/api`;
    return this.health.check([() => this.http.pingCheck('api', url)]);
  }
}
