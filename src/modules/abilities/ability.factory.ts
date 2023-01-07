import { AbilityBuilder, ExtractSubjectType, PureAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from '~/common/enums/action.enum';
import { Role } from '~/common/enums/role.enum';
import { User } from '~/modules/users/entities/user.entity';
import type { UserPayload } from '~auth/interfaces/auth.interface';
import type { AppAbility, Subjects } from './abilities.interface';

@Injectable()
export class AbilityFactory {
  defineAbilitiesFor(user: UserPayload) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(PureAbility);

    if (user.role === Role.ADMIN) {
      can(Action.MANAGE, 'all');
    } else if (user.role === Role.USER) {
      can(Action.READ, User);
      cannot(Action.READ, User, { userId: { $ne: user.userId } }).because(
        "You can't read other users",
      );
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
