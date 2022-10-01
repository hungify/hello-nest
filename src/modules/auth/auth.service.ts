import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Request, Response } from 'express';
import ms from 'ms';
import type { SecurityConfig } from '~/common/interfaces';
import type { LoginAuthDto } from './dto/login-auth.dto';
import type { RegisterAuthDto } from './dto/register-auth.dto';
import type { AuthJwtPayload } from './interfaces/auth.interface';
import { JWTService } from './jwt.service';
import { PasswordService } from './password.service';
import { AuthRepository } from './repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JWTService,
    private readonly configService: ConfigService,
  ) {}

  private async signInTokenAndCookie(payload: AuthJwtPayload, res: Response) {
    const nodeEnv = this.configService.get<string>('nodeEnv');
    const { refreshTokenExpiresIn } =
      this.configService.get<SecurityConfig>('security');

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: true,
      secure: nodeEnv === 'production',
      maxAge: ms(refreshTokenExpiresIn),
      path: '/',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signInToken(payload, 'accessToken'),
      this.jwtService.signInToken(payload, 'refreshToken'),
    ]);

    res.cookie('refreshToken', refreshToken, cookieOptions);

    return accessToken;
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const isUserExist = await this.authRepository.findOne(
      registerAuthDto.email,
    );
    if (isUserExist) throw new ConflictException('User already exists');

    const password = await this.passwordService.hash(registerAuthDto.password);
    Object.assign(registerAuthDto, { password });

    const newUser = await this.authRepository.create(registerAuthDto);

    newUser.password = undefined;
    newUser.id = undefined;
    return newUser;
  }

  async login({ email, password }: LoginAuthDto, res: Response) {
    const foundUser = await this.authRepository.findOne(email);
    if (!foundUser)
      throw new UnauthorizedException("Email or password don't match");

    const isPasswordValid = await this.passwordService.compare(
      password,
      foundUser.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException("Email or password don't match");

    const jwtPayload: AuthJwtPayload = {
      email: foundUser.email,
      id: foundUser.id,
    };

    const accessToken = await this.signInTokenAndCookie(jwtPayload, res);

    return res.status(HttpStatus.OK).json({
      accessToken,
    });
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = this.jwtService.getTokenFromBearerOrCookie(
      req,
      'cookie',
    );

    const jwtPayload = await this.jwtService.verifyToken(
      refreshToken,
      'refreshToken',
    );

    const newAccessToken = await this.signInTokenAndCookie(jwtPayload, res);

    return res.status(HttpStatus.OK).json({
      accessToken: newAccessToken,
    });
  }

  async logout(req: Request, res: Response) {
    const refreshToken = this.jwtService.getTokenFromBearerOrCookie(
      req,
      'cookie',
    );

    await this.jwtService.verifyToken(refreshToken, 'refreshToken');

    res.clearCookie('refreshToken');
    return res.status(HttpStatus.OK).json({
      message: 'Logout successfully',
    });
  }

  async me({ email }: AuthJwtPayload) {
    const foundUser = await this.authRepository.findOne(email);
    if (!foundUser) throw new UnauthorizedException('User not found');

    foundUser.password = undefined;
    foundUser.id = undefined;
    return foundUser;
  }

  async getUserByEmail(email: string) {
    try {
      const foundUser = await this.authRepository.findOne(email);
      if (!foundUser) throw new BadRequestException('User not found');
      return foundUser;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
