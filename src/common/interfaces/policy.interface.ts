import type { ExecutionContext } from '@nestjs/common';
import type {
  AppAbility,
  Subjects,
} from '~/modules/abilities/abilities.interface';
import type { Action } from '../enums';

export interface RequirePolicyRules {
  action: Action;
  subject: Subjects;
}

export interface IPolicyHandler {
  handle(ability: AppAbility, context: ExecutionContext): boolean;
}

type PolicyHandlerCallback = (
  ability: AppAbility,
  context: ExecutionContext,
) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
