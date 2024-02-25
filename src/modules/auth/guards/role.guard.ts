import {
  type CanActivate,
  type ExecutionContext,
  mixin,
  type Type,
} from '@nestjs/common';
import type { Request } from 'express';
import { AppRole } from '~/common/enums/role.enum';

export const RoleGuard = (role: AppRole): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<Request>();
      const currentUser = request.user;

      return currentUser.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};
