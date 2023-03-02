import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '~/modules/users/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly postRepository: Repository<UserEntity>,
  ) {}

  // create(registerAuthDto: any) {
  //   const user = this.postRepository.create(registerAuthDto);
  //   return this.postRepository.save(user);
  // }

  findAll() {
    return this.postRepository.find();
  }
}
