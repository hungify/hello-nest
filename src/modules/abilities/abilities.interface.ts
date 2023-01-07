import type { InferSubjects, PureAbility } from '@casl/ability';
import type { Action } from '~/common/enums';
import type { User } from '~/modules/users/entities/user.entity';
import type { Post } from '../posts/entities/post.entity';

export type Subjects = InferSubjects<typeof User | typeof Post> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;
