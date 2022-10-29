import { ForbiddenError } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { CHECK_ABILITY } from '../decorators/abilities.decorator';
import type { AbilityFactory } from '../ability.factory';
import type { RequireAbilityOptions } from '../interfaces/abilities.interface';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const rules = this.reflector.get<RequireAbilityOptions[]>(
      CHECK_ABILITY,
      context.getHandler(),
    );

    const { user } = context.switchToHttp().getRequest<Request>();
    const ability = this.abilityFactory.defineAbilitiesFor(user);

    try {
      rules.forEach(({ action, subject }) => {
        return ForbiddenError.from(ability).throwUnlessCan(action, subject);
      });
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
