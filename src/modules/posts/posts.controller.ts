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
import { AccessTokenGuard } from '~/auth/guards';
import { CheckPolicies } from '~/common/decorators';
import type {
  BaseResponse,
  MessageResponse,
} from '~/common/dto/base-response.dto';
import { PoliciesGuard } from '~/common/guards';
import { CreatePostDto, UpdatePostDto } from './dto';
import type { PostEntity } from './entities/post.entity';
import {
  CreatePostPolicyHandler,
  DeletePostPolicyHandler,
  ReadPostPolicyHandler,
  UpdatePostPolicyHandler,
} from './policies';
import { PostsService } from './posts.service';

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
