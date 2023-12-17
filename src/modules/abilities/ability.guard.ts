import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { PolicyHandler } from '~/common/types/policy.type';
import { AbilityFactory } from '~/modules/abilities/ability.factory';
import { CHECK_POLICIES_KEY } from './ability.constant';
import { AppAbility } from './abilities.type';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest() as Request;
    const ability = this.abilityFactory.defineAbilitiesFor(user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, context),
    );
  }

  private execPolicyHandler(
    handler: PolicyHandler,
    ability: AppAbility,
    context: ExecutionContext,
  ) {
    if (typeof handler === 'function') {
      return handler(ability, context);
    }
    return handler.handle(ability, context);
  }
}
