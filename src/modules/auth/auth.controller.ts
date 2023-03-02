import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from '~/common/decorators/user.decorator';
import {
  BaseResponse,
  JsonResponse,
  MessageResponse,
} from '~/common/dto/base-response.dto';
import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';
import type { UserPayload } from './interfaces/auth.interface';
import { AuthTokenResponse } from './models/auth.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterAuthDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: MessageResponse,
  })
  async register(
    @Body() registerAuthDto: RegisterAuthDto,
  ): Promise<BaseResponse<MessageResponse>> {
    const message = await this.authService.register(registerAuthDto);

    return {
      data: message,
    };
  }

  @Post('resend-email')
  @ApiQuery({
    name: 'email',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The email has been successfully sent.',
    type: MessageResponse,
  })
  async resendEmail(
    @Query('email') email: string,
  ): Promise<BaseResponse<MessageResponse>> {
    const message = await this.authService.register({ email });
    return {
      data: message,
    };
  }

  @Get('verify')
  @ApiQuery({
    name: 'token',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been verified successfully',
    type: MessageResponse,
  })
  async verify(
    @Query('token') token: string,
  ): Promise<BaseResponse<MessageResponse>> {
    const message = await this.authService.verify(token);
    return {
      data: message,
    };
  }

  @Post('login')
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been login successfully',
    type: AuthTokenResponse,
  })
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res() res: JsonResponse<AuthTokenResponse>,
  ) {
    const accessToken = await this.authService.login(loginAuthDto, res);
    return res.status(HttpStatus.OK).json({
      data: {
        accessToken,
      },
    });
  }

  @Get('refresh-token')
  @UseGuards(RefreshTokenGuard)
  @ApiResponse({
    status: 200,
    description: 'The user has been refresh token successfully',
    type: AuthTokenResponse,
  })
  async refreshToken(
    @GetUser() jwtPayload: UserPayload,
    @Res() res: JsonResponse<AuthTokenResponse>,
  ) {
    const accessToken = await this.authService.refreshToken(jwtPayload, res);
    return res.status(HttpStatus.OK).json({
      data: {
        accessToken,
      },
    });
  }

  @Delete('logout')
  @UseGuards(RefreshTokenGuard)
  @ApiResponse({
    status: 200,
    description: 'The user has been logout successfully',
    type: MessageResponse,
  })
  logout(@Res() res: JsonResponse<MessageResponse>) {
    const message = this.authService.logout(res);
    return res.status(HttpStatus.OK).json({
      data: message,
    });
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    status: 200,
    description: 'The user has been get successfully',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('defaultBearerAuth')
  async me(
    @GetUser() jwtPayload: UserPayload,
  ): Promise<BaseResponse<UserEntity>> {
    const user = await this.authService.me(jwtPayload);
    return {
      data: user,
    };
  }
}
