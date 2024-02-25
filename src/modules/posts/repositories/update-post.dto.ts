import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from '../dtos/create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
