import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    try {
      return compare(password, hashedPassword);
    } catch (error) {
      if (error instanceof Error)
        throw new InternalServerErrorException(error.message);
    }
  }

  hash(password: string) {
    try {
      return hash(password, this.bcryptSaltRounds);
    } catch (error) {
      if (error instanceof Error)
        throw new InternalServerErrorException(error.message);
    }
  }
}
