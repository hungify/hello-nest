import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '~/modules/users/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly postRepository: Repository<User>,
  ) {}

  // create(registerAuthDto: any) {
  //   const user = this.postRepository.create(registerAuthDto);
  //   return this.postRepository.save(user);
  // }

  findAll() {
    return this.postRepository.find();
  }
}
