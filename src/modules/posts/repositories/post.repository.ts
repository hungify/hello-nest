import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '~/modules/users/entities/user.entity';
import type { Post } from '../entities/post.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(User)
    private readonly postRepository: Repository<Post>,
  ) {}

  // create(registerAuthDto: any) {
  //   const user = this.postRepository.create(registerAuthDto);
  //   return this.postRepository.save(user);
  // }

  findAll() {
    return this.postRepository.find();
  }
}
