import { Controller, Get, Req } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import type { Request } from 'express';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiExcludeEndpoint()
  welcome(@Req() req: Request): Record<string, string> {
    return this.appService.welcome(req);
  }
}
