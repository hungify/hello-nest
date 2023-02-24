import type { JwtPayload } from 'jsonwebtoken';

import type { User } from '~/modules/users/entities/user.entity';

export type TokenType = 'accessToken' | 'refreshToken';

type UserToPayload = Pick<User, 'email' | 'userId' | 'isVerified' | 'role'>;

export interface UserPayload extends JwtPayload, UserToPayload {}
