import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import type { LoginAuthDto } from './dto/login-auth.dto';
import type { RegisterAuthDto } from './dto/register-auth.dto';
import { EmailService } from './email.service';
import type { UserPayload } from './interfaces/auth.interface';
import { AuthHelper } from './helpers/auth.helper';
import { PasswordService } from './password.service';
import { AuthRepository } from './repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordService: PasswordService,
    private readonly authHelper: AuthHelper,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async sendVerifyEmail(email: string, token: string) {
    const baseClientUrl = this.configService.get<string>('baseClientUrl');

    const verifyUrl = `${baseClientUrl}/auth/verify?token=${token}&email=${email}`;

    return this.emailService.sendEmail({
      verifyUrl,
      email,
      subject: 'Verify your email',
      type: 'register',
    });
  }

  async register({ email }): Promise<{ message: string }>;
  async register({ email, fullName, password }: RegisterAuthDto) {
    let accessToken = '';

    // If have email only, resend email verify
    if ((!fullName || !password) && email) {
      const foundUser = await this.authRepository.findOne(email);
      if (!foundUser) throw new UnauthorizedException('User not found');
      accessToken = await this.authHelper.signInToken(
        {
          email: foundUser.email,
          userId: foundUser.userId,
          isVerified: foundUser.isVerified,
          role: foundUser.role,
        },
        'accessToken',
      );
    } else {
      const isUserExist = await this.authRepository.findOne(email);
      if (isUserExist) throw new ConflictException('User already exists');

      const passwordHashed = await this.passwordService.hash(password);
      Object.assign({ password: passwordHashed });

      const newUser = await this.authRepository.create({
        email,
        fullName,
        password: passwordHashed,
      });

      newUser.password = undefined;

      accessToken = await this.authHelper.signInToken(
        { ...newUser },
        'accessToken',
      );
    }

    const info = await this.sendVerifyEmail(email, accessToken);

    if (!info) throw new UnauthorizedException('Send email failed');

    return {
      message: 'Please check your email to verify your account',
    };
  }

  async verify(token: string) {
    const { email } = await this.authHelper.verifyToken(token, 'accessToken');

    const foundUser = await this.authRepository.findOne(email);
    foundUser.isVerified = true;
    return {
      message: 'Verify successfully',
    };
  }

  async login({ email, password }: LoginAuthDto, res: Response) {
    const foundUser = await this.authRepository.findOne(email, {
      isVerified: true,
    });

    if (!foundUser)
      throw new UnauthorizedException("Email or password don't match");

    const isPasswordValid = await this.passwordService.verify(
      password,
      foundUser.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException("Email or password don't match");

    const userPayload = this.authHelper.getUserPayloadFromUser(foundUser);
    const accessToken = await this.authHelper.signInTokenAndSetCookie(
      userPayload,
      res,
    );

    return res.status(HttpStatus.OK).json({
      accessToken,
    });
  }

  async refreshToken(userPayload: UserPayload, res: Response) {
    const newAccessToken = await this.authHelper.signInTokenAndSetCookie(
      userPayload,
      res,
    );
    return res.status(HttpStatus.OK).json({
      accessToken: newAccessToken,
    });
  }

  async logout(res: Response) {
    res.clearCookie('refreshToken');
    return res.status(HttpStatus.OK).json({
      message: 'Logout successfully',
    });
  }

  async me({ email }: UserPayload) {
    const foundUser = await this.authRepository.findOne(email);
    if (!foundUser) throw new UnauthorizedException('User not found');

    foundUser.password = undefined;
    foundUser.userId = undefined;
    return foundUser;
  }
}
