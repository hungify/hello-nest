import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMailOptions, createTransport } from 'nodemailer';
import { GmailConfig } from '~/common/types/config.type';

@Injectable()
export class EmailHelper {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail(sendMailOptions: SendMailOptions) {
    const gmail = this.configService.get<GmailConfig>('gmail');

    const transporter = createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: gmail.user,
        pass: gmail.password,
      },
    });
    return await transporter.sendMail(sendMailOptions);
  }
}
