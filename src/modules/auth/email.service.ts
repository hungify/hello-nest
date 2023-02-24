import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import mustache from 'mustache';
import { createTransport } from 'nodemailer';
import path from 'path';
import type { GmailConfig } from '~/common/interfaces';
import type { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  sendEmail({ verifyUrl, email, subject, type }: SendEmailDto) {
    try {
      let templatePath = '';
      let html = '';
      if (type === 'register') {
        templatePath = path.join(__dirname, 'templates', 'register.html');
        html = fs.readFileSync(templatePath, 'utf8');
      } else {
        templatePath = path.join(__dirname, 'templates', 'reset-password.html');
        html = fs.readFileSync(templatePath, 'utf8');
      }

      const gmail = this.configService.get<GmailConfig>('gmail');

      const transporter = createTransport({
        service: 'gmail',
        secure: true,
        auth: {
          user: gmail.user,
          pass: gmail.password,
        },
      });

      const info = {
        from: `Application name 👻 ${gmail.user}`,
        to: email,
        subject: subject,
        html: mustache.render(html, { link: verifyUrl }),
      };

      return transporter.sendMail(info);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
