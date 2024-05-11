import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  create(createUserDto: CreateUserDto) {
    return {
      message: 'User created',
      data: createUserDto,
    };
  }

  get(userId: number) {
    return this.usersRepository.findOne(userId);
  }
}
