import type { ExecutionContext } from '@nestjs/common';
import { AppAbility, AppSubjects } from '~/modules/abilities/abilities.type';
import { AppAction } from '../enums/action.enum';

export interface RequirePolicyRules {
  action: AppAction;
  subject: AppSubjects;
}

export interface IPolicyHandler {
  handle(ability: AppAbility, context: ExecutionContext): boolean;
}

type PolicyHandlerCallback = (
  ability: AppAbility,
  context: ExecutionContext,
) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
