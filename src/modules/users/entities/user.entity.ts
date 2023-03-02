import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { BaseModel } from 'src/common/models/base.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' }) // SQL table name will be 'users'
export class UserEntity extends BaseModel {
  @PrimaryGeneratedColumn()
  userId: number;

  @ApiProperty({
    example: 'example',
    description: 'The name of User',
  })
  @Column()
  fullName: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of User',
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'example',
    description: 'The password of User',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'example',
    description: 'The verify code of User',
  })
  @Column({ default: false })
  isVerified: boolean;

  @ApiProperty({
    example: 'user',
    description: 'The role of User',
    default: 'user',
  })
  @Column({ default: 'user' })
  @IsEnum(['user', 'admin'])
  role: string;
}
