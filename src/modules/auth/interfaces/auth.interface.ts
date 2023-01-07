import type { JwtPayload } from 'jsonwebtoken';
import type { User } from '~/modules/users/entities/user.entity';

export type TokenType = 'accessToken' | 'refreshToken';

export type UserPayload = JwtPayload &
  Pick<User, 'email' | 'userId' | 'isVerified' | 'role'>;
