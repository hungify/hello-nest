import { genSaltSync, hashSync } from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' }) // SQL table name will be 'users'
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;
}
