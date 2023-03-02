import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, RemoveOptions, Repository } from 'typeorm';
import type { CreatePostDto, UpdatePostDto } from '../dto';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const newPost = this.postRepository.create(createPostDto);
    return this.postRepository.save(newPost);
  }

  update(post: PostEntity, updatePostDto: UpdatePostDto) {
    return this.postRepository.merge(post, updatePostDto);
  }

  find(conditions?: FindOneOptions<PostEntity>) {
    return this.postRepository.find(conditions);
  }

  findOne(conditions?: FindOneOptions<PostEntity>) {
    return this.postRepository.findOne(conditions);
  }

  remove(post: PostEntity, options: RemoveOptions = {}) {
    return this.postRepository.remove(post, options);
  }
}
