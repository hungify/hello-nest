import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from '~/modules/users/entities/user.entity';
import type { RegisterAuthDto } from '../dto';

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

  findOne(email: string, conditions?: FindOptionsWhere<User>) {
    return this.usersRepository.findOne({ where: { email, ...conditions } });
  }
}
