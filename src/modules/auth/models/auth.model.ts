import type { JwtPayload } from 'jsonwebtoken';
import { User } from '~/modules/users/entities/user.entity';

export class UserResponse extends User {}

export class JwtPayloadResponse implements JwtPayload {}
