import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const { user = null } = ctx.switchToHttp().getRequest<Request>();
    return data ? user && user[data] : user;
  },
);
