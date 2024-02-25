import { Module } from '@nestjs/common';
import { EmailHelper } from './email.helper';
import { EmailService } from './email.service';

@Module({
  imports: [],
  providers: [EmailService, EmailHelper],
  exports: [EmailService],
})
export class EmailModule {}
