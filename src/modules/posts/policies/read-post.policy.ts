import { Action } from '~/common/enums';
import type { IPolicyHandler } from '~/common/interfaces/policy.interface';
import type { AppAbility } from '~/modules/abilities/abilities.interface';
import { Post } from '../entities/post.entity';

export class ReadPostPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.READ, Post);
  }
}
