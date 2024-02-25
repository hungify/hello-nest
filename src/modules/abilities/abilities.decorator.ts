import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from '~/common/types/policy.type';
import { CHECK_POLICIES_KEY } from './ability.constant';

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
