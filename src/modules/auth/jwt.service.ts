import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import type { Request } from 'express';
import type { SecurityConfig } from '~/common/interfaces';
import type { AuthJwtPayload, TokenType } from './interfaces/auth.interface';

@Injectable()
export class JWTService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private jwtOptions(type: TokenType) {
    const {
      refreshTokenSecret,
      refreshTokenExpiresIn,
      accessTokenExpiresIn,
      accessTokenSecret,
    } = this.configService.get<SecurityConfig>('security');

    const expiresIn =
      type === 'accessToken' ? accessTokenExpiresIn : refreshTokenExpiresIn;

    const secret =
      type === 'accessToken' ? accessTokenSecret : refreshTokenSecret;

    const options: JwtSignOptions = {
      expiresIn,
      secret,
    };

    return options;
  }

  signInToken(payload: AuthJwtPayload, type: TokenType) {
    const options = this.jwtOptions(type);
    return this.jwtService.signAsync(payload, options);
  }

  async verifyToken(token: string, type: TokenType) {
    try {
      const options = this.jwtOptions(type);
      const payload = await this.jwtService.verifyAsync<AuthJwtPayload>(
        token,
        options,
      );
      return {
        id: payload.id,
        email: payload.email,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'TokenExpiredError')
          throw new UnauthorizedException('Token expired');
        else if (error.name === 'JsonWebTokenError')
          throw new BadRequestException('Invalid token');
        else throw new InternalServerErrorException(error.message);
      }
    }
  }

  getTokenFromBearerOrCookie(
    reqOrToken: Request | string,
    type: 'bearer' | 'cookie',
  ) {
    let tokenKey: string, bearer: string;
    const isTokenType = typeof reqOrToken === 'string';

    if (type === 'bearer' || isTokenType) {
      [bearer, tokenKey] = isTokenType
        ? reqOrToken.split(' ')
        : reqOrToken.headers['authorization'].split(' ');
    } else {
      tokenKey = reqOrToken.cookies['refreshToken'];
      if (!tokenKey)
        throw new UnauthorizedException('RefreshToken cookie is required');
    }

    if ((type === 'bearer' && bearer !== 'Bearer') || !tokenKey) {
      const message =
        type === 'bearer'
          ? 'Authorization header must be in the format of `Bearer ${token}`'
          : 'Refresh token must be in the format of `token`';

      throw new UnauthorizedException(message);
    }

    return tokenKey;
  }
}
