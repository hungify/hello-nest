import type { User } from '~/modules/users/entities/user.entity';

export type TokenType = 'accessToken' | 'refreshToken';

export type UserPayload = Pick<
  User,
  'email' | 'userId' | 'isVerified' | 'role'
>;
