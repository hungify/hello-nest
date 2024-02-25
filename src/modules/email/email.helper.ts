import { AppConfig } from '~/common/types/config.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMailOptions, createTransport } from 'nodemailer';

@Injectable()
export class EmailHelper {
  constructor(private readonly configService: ConfigService<AppConfig>) {}

  async sendEmail(sendMailOptions: SendMailOptions) {
    const gmail = this.configService.get('gmail', { infer: true });

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
