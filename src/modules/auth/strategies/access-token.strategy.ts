import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfig } from 'src/common/types/config.type';
import { UserPayload } from '../types/payload';
import { UsersService } from '~/modules/users/users.service';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(
    @Inject(ConfigService) configService: ConfigService<AppConfig>,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {
    const { accessTokenSecret } = configService.get('security', {
      infer: true,
    });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessTokenSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: UserPayload & JwtPayload) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { iat, exp, ...rest } = payload;

    const user = await this.usersService.get(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    return rest;
  }
}
