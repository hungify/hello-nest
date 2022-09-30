import { User } from 'src/modules/users/entities/user.entity';
import { AuthJwtPayload } from '../interfaces/auth.interface';

export class UserResponse extends User {}

export class JwtPayloadResponse implements AuthJwtPayload {
  id: number | string;
  email: string;
}
