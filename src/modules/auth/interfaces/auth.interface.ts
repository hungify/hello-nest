import type { JwtPayload } from 'jsonwebtoken';

import type { UserEntity } from '~/modules/users/entities/user.entity';

export type TokenType = 'accessToken' | 'refreshToken';

type UserToPayload = Pick<
  UserEntity,
  'email' | 'userId' | 'isVerified' | 'role'
>;

export interface UserPayload extends JwtPayload, UserToPayload {}
