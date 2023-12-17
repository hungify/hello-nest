import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor() {}
  create(createUserDto: CreateUserDto) {
    return {
      message: 'User created',
      data: createUserDto,
    };
  }
}
