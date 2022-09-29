import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import { SecurityConfig } from 'src/common/interfaces';

@Injectable()
export class PasswordService {
  constructor(private configService: ConfigService) {}

  get bcryptSaltRounds() {
    const { saltRounds } = this.configService.get<SecurityConfig>('security');
    return saltRounds;
  }

  compare(password: string, hashedPassword: string) {
    try {
      return compare(password, hashedPassword);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  hash(password: string) {
    try {
      return hash(password, this.bcryptSaltRounds);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
