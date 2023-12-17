import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfig } from '~/common/types/config.type';
import { UserPayload } from '../types/payload';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(@Inject(ConfigService) configService: ConfigService) {
    const { refreshTokenSecret } =
      configService.get<SecurityConfig>('security');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: UserPayload) {
    const refreshToken = req.cookies?.refreshToken;
    return refreshToken ? payload : null;
  }
}
