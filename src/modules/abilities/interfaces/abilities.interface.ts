import type { InferSubjects, PureAbility } from '@casl/ability';
import type { Action } from '~/common/enums/action.enum';
import type { User } from '~/modules/users/entities/user.entity';

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

export interface RequireAbilityOptions {
  action: Action;
  subject: Subjects;
}
