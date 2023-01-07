import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class FormatResponseMiddleware implements NestMiddleware {
  use(_req: Request, res: Response, next: NextFunction) {
    const original = res.json;
    res.json = function (args) {
      if (args.path) {
        delete args.statusCode;
        return original.call(this, {
          statusCode: res.statusCode,
          error: args,
        });
      } else {
        return original.call(this, {
          statusCode: res.statusCode,
          message: args.message || '',
          data: args,
        });
      }
    };
    next();
  }
}
