import { User } from '~/modules/users/entities/user.entity';
import type { AuthJwtPayload } from '~auth/interfaces/auth.interface';

export class UserResponse extends User {}

export class JwtPayloadResponse implements AuthJwtPayload {
  id: number | string;
  email: string;
}
