import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfig } from 'src/common/interfaces';
import { AuthService } from '../auth.service';
import { AuthJwtPayload } from '../interfaces/auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey:
        configService.get<SecurityConfig>('security').accessTokenSecret,
    });
  }

  async validate(payload: AuthJwtPayload) {
    return this.authService.getUserByEmail(payload.email);
  }
}
