import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { AppConfig } from '~/common/types/config.type';
import { UserPayload } from '../types/payload';
import { UsersService } from '~/modules/users/users.service';
import { JwtPayload } from 'jsonwebtoken';

const cookieExtractor = (request: Request): string | null => {
  let token = null;
  if (request && request.cookies) {
    token = request.cookies['refreshToken'];
  }
  return token;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(
    @Inject(ConfigService) configService: ConfigService<AppConfig, false>,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {
    const { refreshTokenSecret } = configService.get('security', {
      infer: true,
    });
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: refreshTokenSecret,
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
