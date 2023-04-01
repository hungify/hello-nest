import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const Protocol = createParamDecorator(
  (_defaultValue: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);
