import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example',
    description: 'The name of User',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'This is content of this post',
    description: 'The content of the post',
  })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: ':this-is-a-post',
    description: 'The slug of the post',
  })
  slug: string;
}
