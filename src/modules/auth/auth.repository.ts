import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, type FindOptionsWhere } from 'typeorm';
import { UserEntity } from '~/modules/users/entities/user.entity';
import { RegisterAuthDto } from './dtos/register-auth.dto';

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
