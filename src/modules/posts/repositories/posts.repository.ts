import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, type RemoveOptions, type FindOneOptions } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from './update-post.dto';

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
