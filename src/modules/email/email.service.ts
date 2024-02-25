import { IEmailService } from './email.interface';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import mustache from 'mustache';
import path from 'path';
import { EmailRegisterDto } from './dtos/register.dto';
import { EmailHelper } from './email.helper';
import { EmailForgotPasswordDto } from './dtos/forgot-password.dto';
import { AppConfig } from '~/common/types/config.type';

@Injectable()
export class EmailService implements IEmailService {
  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly emailHelper: EmailHelper,
  ) {}

  async register({ email, subject, verifyUrl }: EmailRegisterDto) {
    try {
      const templatePath = path.join(__dirname, 'templates', 'register.html');
      const html = fs.readFileSync(templatePath, 'utf8');

      const gmail = this.configService.get('gmail', { infer: true });

      const info = {
        from: `Application name 👻 ${gmail.user}`,
        to: email,
        subject: subject,
        html: mustache.render(html, { link: verifyUrl }),
      };

      this.emailHelper.sendEmail(info);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      return false;
    }
  }
  async forgotPassword({ email, subject, verifyUrl }: EmailForgotPasswordDto) {
    try {
      const templatePath = path.join(__dirname, 'templates', 'register.html');
      const html = fs.readFileSync(templatePath, 'utf8');

      const gmail = this.configService.get('gmail', { infer: true });

      const info = {
        from: `Application name 👻 ${gmail.user}`,
        to: email,
        subject: subject,
        html: mustache.render(html, { link: verifyUrl }),
      };

      this.emailHelper.sendEmail(info);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      return false;
    }
  }
}
