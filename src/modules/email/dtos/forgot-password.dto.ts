import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
