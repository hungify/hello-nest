import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { SecurityConfig } from '~/common/interfaces';
import type { UserPayload } from '~/auth/interfaces/auth.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(@Inject(ConfigService) configService: ConfigService) {
    const { accessTokenSecret } = configService.get<SecurityConfig>('security');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessTokenSecret,
    });
  }

  validate(payload: UserPayload) {
    return payload;
  }
}
