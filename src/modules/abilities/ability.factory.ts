import {
  AbilityBuilder,
  createMongoAbility,
  type ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AppAbility, AppSubjects } from './abilities.type';
import { UserPayload } from '../auth/types/payload';
import { UserEntity } from '../users/entities/user.entity';
import { AppRole } from '~/common/enums/role.enum';
import { AppAction } from '~/common/enums/action.enum';
import { PostEntity } from '~/modules/posts/entities/post.entity';

@Injectable()
export class AbilityFactory {
  defineAbilitiesFor(user: UserPayload) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (user.role === AppRole.ADMIN) {
      can(AppAction.MANAGE, 'all');
    } else if (user.role === AppRole.USER) {
      // Define rules for User
      cannot(AppAction.READ, UserEntity, {
        userId: { $ne: user.userId },
      }).because("You can't read other users");

      // Define rules for Post
      can(AppAction.READ, PostEntity);
      can(AppAction.CREATE, PostEntity);
      can(AppAction.UPDATE, PostEntity, { userId: user.userId }).because(
        'You can only update your own posts',
      );
      can(AppAction.DELETE, PostEntity, { userId: user.userId }).because(
        'You can only delete your own posts',
      );
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<AppSubjects>,
    });
  }
}
