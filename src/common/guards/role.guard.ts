import {
  type CanActivate,
  type ExecutionContext,
  mixin,
  type Type,
} from '@nestjs/common';
import type { Role } from '../enums';
import type { Request } from 'express';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<Request>();
      const currentUser = request.user;

      return currentUser.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};
