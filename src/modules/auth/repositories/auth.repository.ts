import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '~/modules/users/entities/user.entity';
import type { RegisterAuthDto } from '~auth/dto/register-auth.dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(registerAuthDto: RegisterAuthDto) {
    const user = this.usersRepository.create(registerAuthDto);
    return this.usersRepository.save(user);
  }

  findOne(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
