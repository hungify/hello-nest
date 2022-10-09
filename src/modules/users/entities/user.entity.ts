import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/common/models/base.model';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' }) // SQL table name will be 'users'
export class User extends BaseModel {
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
}
