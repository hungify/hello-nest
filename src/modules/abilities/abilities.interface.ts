import type { InferSubjects, PureAbility } from '@casl/ability';
import type { Action } from '~/common/enums';
import type { UserEntity } from '~/modules/users/entities/user.entity';
import type { PostEntity } from '../posts/entities/post.entity';

export type Subjects =
  | InferSubjects<typeof UserEntity | typeof PostEntity>
  | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;
