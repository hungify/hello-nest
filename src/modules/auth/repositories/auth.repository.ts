import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from '../../auth/dto/register-auth.dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(registerAuthDto: RegisterAuthDto): Promise<User> {
    const user = this.usersRepository.create(registerAuthDto);
    return this.usersRepository.save(user);
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
