import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailRegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
