import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const exceptionRes =
      exception instanceof HttpException ? exception.getResponse() : null;

    const error =
      typeof res === 'string'
        ? {
            message: exceptionRes,
          }
        : {
            ...(exceptionRes as object),
          };

    res.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
