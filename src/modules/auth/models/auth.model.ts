import { ApiProperty } from '@nestjs/swagger';
import { Token } from './token.model';

export class AuthTokenResponse extends Token {
  @ApiProperty({
    type: String,
    description: 'The access token',
  })
  accessToken: string;

  constructor(partial: Partial<AuthTokenResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
