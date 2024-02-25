import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { AppConfig } from '~/common/types/config.type';

@Injectable()
export class PasswordService {
  constructor(private configService: ConfigService<AppConfig>) {}

  private get saltRounds() {
    const { saltRounds } = this.configService.get('security', {
      infer: true,
    });
    return saltRounds;
  }

  verify(password: string, hashedPassword: string) {
    return argon2.verify(hashedPassword, password);
  }

  hash(password: string) {
    return argon2.hash(password, {
      salt: Buffer.alloc(this.saltRounds),
    });
  }
}
