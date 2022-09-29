import { RegisterAuthDto } from 'src/modules/auth/dto/register-auth.dto';
import { User } from '../entities/user.entity';

export interface UserServiceInterface {
  create(userDto: RegisterAuthDto): Promise<User>;
}
