import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import type { CookieOptions, Response } from 'express';
import ms from 'ms';
import { TokenType, UserPayload } from './types/payload';
import { UserEntity } from '../users/entities/user.entity';
import { SecurityConfig } from '~/common/types/config.type';

@Injectable()
export class AuthHelper {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  getUserPayloadFromUser(user: UserEntity): UserPayload {
    return {
      email: user.email,
      userId: user.userId,
      isVerified: user.isVerified,
      role: user.role,
    };
  }

  async signInTokenAndSetCookie(payload: UserPayload, res: Response) {
    const nodeEnv = this.configService.get<string>('nodeEnv');
    const { refreshTokenExpiresIn } =
      this.configService.get<SecurityConfig>('security');

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: nodeEnv === 'production',
      maxAge: ms(refreshTokenExpiresIn),
      path: '/',
    };

    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.signInToken(payload, 'accessToken'),
        this.signInToken(payload, 'refreshToken'),
      ]);
      res.cookie('refreshToken', refreshToken, cookieOptions);
      return accessToken;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

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

  signInToken(payload: UserPayload, type: TokenType) {
    try {
      const options = this.jwtOptions(type);
      return this.jwtService.signAsync(payload, options);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async verifyToken(token: string, type: TokenType) {
    try {
      const options = this.jwtOptions(type);
      const payload = await this.jwtService.verifyAsync<UserPayload>(
        token,
        options,
      );
      return payload;
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
}
