import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import type { Role } from '../enums';
import type { Request } from 'express';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<Request>();
      const user = request.user;

      return user?.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};
