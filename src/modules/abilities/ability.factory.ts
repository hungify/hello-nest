import {
  AbilityBuilder,
  createMongoAbility,
  type ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import type { UserPayload } from '~/auth/interfaces/auth.interface';
import { Role, Action } from '~/common/enums';
import { UserEntity } from '~/modules/users/entities/user.entity';
import { PostEntity } from '../posts/entities/post.entity';
import type { AppAbility, Subjects } from './abilities.interface';

@Injectable()
export class AbilityFactory {
  defineAbilitiesFor(user: UserPayload) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (user.role === Role.ADMIN) {
      can(Action.MANAGE, 'all');
    } else if (user.role === Role.USER) {
      // Define rules for User
      cannot(Action.READ, UserEntity, { userId: { $ne: user.userId } }).because(
        "You can't read other users",
      );

      // Define rules for Post
      can(Action.READ, PostEntity);
      can(Action.CREATE, PostEntity);
      can(Action.UPDATE, PostEntity, { userId: user.userId }).because(
        'You can only update your own posts',
      );
      can(Action.DELETE, PostEntity, { userId: user.userId }).because(
        'You can only delete your own posts',
      );
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
