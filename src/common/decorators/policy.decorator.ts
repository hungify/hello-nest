import { SetMetadata } from '@nestjs/common';
import { CHECK_POLICIES_KEY } from '../constants';
import type { PolicyHandler } from '../interfaces/policy.interface';

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
