import { Action } from '~/common/enums';
import type { IPolicyHandler } from '~/common/interfaces/policy.interface';
import type { AppAbility } from '~/modules/abilities/abilities.interface';
import { PostEntity } from '../entities/post.entity';

export class CreatePostPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.CREATE, PostEntity);
  }
}

export class ReadPostPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.READ, PostEntity);
  }
}

export class UpdatePostPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.UPDATE, PostEntity);
  }
}

export class DeletePostPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.DELETE, PostEntity);
  }
}
