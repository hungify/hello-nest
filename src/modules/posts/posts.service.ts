import { Injectable } from '@nestjs/common';
import { PostRepository } from './repositories/posts.repository';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './repositories/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return post;
  }

  find() {
    return this.postRepository.find();
  }

  findOne(postId: number) {
    return this.postRepository.findOne({ where: { postId } });
  }

  async update(postId: number, updatePostDto: UpdatePostDto) {
    const foundPost = await this.postRepository.findOne({ where: { postId } });
    if (!foundPost) return null;
    return this.postRepository.update(foundPost, updatePostDto);
  }

  async remove(postId: number) {
    const foundPost = await this.postRepository.findOne({ where: { postId } });
    if (!foundPost) return null;
    return this.postRepository.remove(foundPost);
  }
}
