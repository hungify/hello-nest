import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthTokenResponse {
  @Expose()
  @ApiProperty()
  accessToken: string;
}
