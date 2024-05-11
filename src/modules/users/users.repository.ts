import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, type FindOptionsWhere } from 'typeorm';
import { UserEntity } from '~/modules/users/entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  findOne(userId: number, conditions?: FindOptionsWhere<UserEntity>) {
    return this.usersRepository.findOne({ where: { userId, ...conditions } });
  }
}
