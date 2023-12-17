import { AppAbility } from '~/modules/abilities/abilities.type';
import { PostEntity } from '../entities/post.entity';
import { AppAction } from '~/common/enums/action.enum';
import { IPolicyHandler } from '~/common/types/policy.type';

export class CreatePostPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(AppAction.CREATE, PostEntity);
  }
}

export class ReadPostPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(AppAction.READ, PostEntity);
  }
}

export class UpdatePostPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(AppAction.UPDATE, PostEntity);
  }
}

export class DeletePostPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(AppAction.DELETE, PostEntity);
  }
}
