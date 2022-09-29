import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/modules/users/entities/user.entity';
import { AuthService } from '../auth.service';
import { LoginAuthDto } from '../dto/login-auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // async validate(loginAuthDto: LoginAuthDto): Promise<User> {
  //   const user = await this.authService.login(loginAuthDto);
  //   if (!user) throw new UnauthorizedException();
  //   return user;
  // }
}
