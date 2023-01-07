import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { SecurityConfig } from '~/common/interfaces';
import type { UserPayload } from '~auth/interfaces/auth.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(@Inject(ConfigService) configService: ConfigService) {
    const { refreshTokenSecret } =
      configService.get<SecurityConfig>('security');

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request.cookies?.refreshToken;
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: refreshTokenSecret,
    });
  }

  validate(payload: UserPayload) {
    delete payload?.exp;
    return payload;
  }
}
