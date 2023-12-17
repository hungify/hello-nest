import { EmailForgotPasswordDto } from './dtos/forgot-password.dto';
import { EmailRegisterDto } from './dtos/register.dto';

export interface IEmailService {
  register(args: EmailRegisterDto): Promise<boolean>;
  forgotPassword(args: EmailForgotPasswordDto): Promise<boolean>;
}
