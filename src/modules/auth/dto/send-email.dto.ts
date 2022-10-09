import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  subject: 'Verify your email' | 'Reset your password';

  @IsNotEmpty()
  type: 'register' | 'forgotPassword';

  @IsString()
  @IsNotEmpty()
  verifyUrl: string;
}
