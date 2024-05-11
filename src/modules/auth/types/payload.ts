import { UserEntity } from '~/modules/users/entities/user.entity';

export type TokenType = 'accessToken' | 'refreshToken';

export type UserPayload = Pick<
  UserEntity,
  'email' | 'userId' | 'isVerified' | 'role'
>;
