import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from '~/modules/users/entities/user.entity';
import type { RegisterAuthDto } from '../dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  create(registerAuthDto: RegisterAuthDto) {
    const user = this.usersRepository.create(registerAuthDto);
    return this.usersRepository.save(user);
  }

  findOne(email: string, conditions?: FindOptionsWhere<UserEntity>) {
    return this.usersRepository.findOne({ where: { email, ...conditions } });
  }
}
