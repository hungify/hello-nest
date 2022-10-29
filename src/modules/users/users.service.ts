import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from './dto/createUser.dto';

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
