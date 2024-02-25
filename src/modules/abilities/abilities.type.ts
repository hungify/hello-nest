import type { InferSubjects, PureAbility } from '@casl/ability';
import type { UserEntity } from '~/modules/users/entities/user.entity';
import { AppAction } from '~/common/enums/action.enum';
import { PostEntity } from '~/modules/posts/entities/post.entity';

export type AppSubjects =
  | InferSubjects<typeof UserEntity | typeof PostEntity>
  | 'all';

export type AppAbility = PureAbility<[AppAction, AppSubjects]>;
