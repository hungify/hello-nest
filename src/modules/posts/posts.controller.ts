import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import type { PostEntity } from './entities/post.entity';

import { PostsService } from './posts.service';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { CheckPolicies } from '../abilities/abilities.decorator';
import { CreatePostDto } from './dtos/create-post.dto';
import { BaseResponse, MessageResponse } from '~/common/dtos/base-response.dto';
import { UpdatePostDto } from './repositories/update-post.dto';
import {
  CreatePostPolicyHandler,
  DeletePostPolicyHandler,
  ReadPostPolicyHandler,
  UpdatePostPolicyHandler,
} from './policies/posts.policy';
import { PoliciesGuard } from '../abilities/ability.guard';

@Controller('posts')
@ApiTags('Posts')
@UseGuards(PoliciesGuard)
@UseGuards(AccessTokenGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBody({ type: CreatePostDto })
  @CheckPolicies(new CreatePostPolicyHandler())
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
    type: CreatePostDto,
  })
  async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<BaseResponse<PostEntity>> {
    const post = await this.postsService.create(createPostDto);
    return {
      data: post,
    };
  }

  @Get()
  @CheckPolicies(new ReadPostPolicyHandler())
  async find(): Promise<BaseResponse<PostEntity[]>> {
    const posts = await this.postsService.find();
    return {
      data: posts,
    };
  }

  @Get(':postId')
  @CheckPolicies(new ReadPostPolicyHandler())
  async findOne(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<BaseResponse<PostEntity>> {
    const post = await this.postsService.findOne(postId);
    return {
      data: post,
    };
  }

  @Patch(':postId')
  @CheckPolicies(new UpdatePostPolicyHandler())
  async update(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<BaseResponse<PostEntity>> {
    const updatedPost = await this.postsService.update(postId, updatePostDto);

    return {
      data: updatedPost,
    };
  }

  @Delete(':id')
  @CheckPolicies(new DeletePostPolicyHandler())
  remove(
    @Param('id', ParseIntPipe) postId: number,
  ): BaseResponse<MessageResponse> {
    const deletedPost = this.postsService.remove(postId);
    const message = deletedPost ? 'Post deleted' : 'Post not found';

    return {
      data: {
        message,
      },
    };
  }
}
