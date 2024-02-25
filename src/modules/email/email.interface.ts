import { EmailForgotPasswordDto } from './dtos/forgot-password.dto';
import { EmailRegisterDto } from './dtos/register.dto';

export interface IEmailService {
  register(args: EmailRegisterDto): void;
  forgotPassword(args: EmailForgotPasswordDto): void;
}
