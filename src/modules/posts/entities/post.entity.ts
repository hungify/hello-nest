import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '~/common/models/base.model';

@Entity({ name: 'posts' }) // SQL table name will be 'users'
export class Post extends BaseModel {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'This is a post',
    description: 'The title of the post',
  })
  title: string;

  @IsString()
  @Column({ nullable: false })
  @IsNotEmpty()
  @ApiProperty({
    example: 'This is content of this post',
    description: 'The content of the post',
  })
  content: string;

  @IsString()
  @Column({ nullable: false })
  @IsNotEmpty()
  @ApiProperty({
    example: ':this-is-a-post',
    description: 'The slug of the post',
  })
  slug: string;
}
