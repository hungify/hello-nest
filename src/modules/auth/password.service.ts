import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import type { SecurityConfig } from '~/common/interfaces';

@Injectable()
export class PasswordService {
  constructor(private configService: ConfigService) {}

  private get bcryptSaltRounds() {
    const { saltRounds } = this.configService.get<SecurityConfig>('security');
    return saltRounds;
  }

  compare(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }

  hash(password: string) {
    return hash(password, this.bcryptSaltRounds);
  }
}
