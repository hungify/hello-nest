import { ApiProperty } from '@nestjs/swagger';
import { User } from '~/modules/users/entities/user.entity';
import { Token } from './token.model';

export class Auth extends Token {
  @ApiProperty({
    type: User,
    description: 'The user who has logged in',
  })
  user: User;
}
