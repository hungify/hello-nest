import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty({
    type: String,
    description: 'The JWT token',
  })
  idToken?: string;

  @ApiProperty({
    type: String,
    description: 'The access token',
  })
  accessToken?: string;

  @ApiProperty({
    type: String,
    description: 'The refresh token',
  })
  refreshToken?: string;

  constructor(partial: Partial<Token>) {
    Object.assign(this, partial);
  }
}
