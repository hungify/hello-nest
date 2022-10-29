import { SetMetadata } from '@nestjs/common';
import type { RequireAbilityOptions } from '../interfaces/abilities.interface';

export const CHECK_ABILITY = 'CHECK_ABILITY';

export const CheckAbility = (...requirements: RequireAbilityOptions[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
