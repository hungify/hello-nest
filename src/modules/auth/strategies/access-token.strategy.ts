import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfig } from 'src/common/types/config.type';
import { UserPayload } from '../types/payload';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(@Inject(ConfigService) configService: ConfigService<AppConfig>) {
    const { accessTokenSecret } = configService.get('security', {
      infer: true,
    });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessTokenSecret,
    });
  }

  validate(payload: UserPayload) {
    return payload;
  }
}
