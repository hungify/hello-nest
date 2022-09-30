import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @Length(6, 20)
  @ApiProperty({
    example: 'example',
  })
  readonly fullName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'example@example.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    example: 'example',
  })
  readonly password: string;
}
