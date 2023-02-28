import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
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
  getSchemaPath,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { GetUser } from '~/common/decorators/user.decorator';
import type {
  BaseResponse,
  MessageResponse,
  JsonResponse,
} from '~/common/dto/base-response.dto';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import type { AuthTokenResponse } from './dto/auth-response.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';
import type { UserPayload } from './interfaces/auth.interface';
import { Auth } from './models/auth.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterAuthDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
    schema: {
      $ref: getSchemaPath(RegisterAuthDto),
    },
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
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
    schema: {
      $ref: getSchemaPath(RegisterAuthDto),
    },
  })
  async resendEmail(
    @Req() req: Request,
  ): Promise<BaseResponse<MessageResponse>> {
    const email = req.query.email as string;
    const message = await this.authService.register({ email });
    return {
      data: message,
    };
  }

  @Get('verify')
  @ApiQuery({
    name: 'token',
  })
  async verify(@Req() req: Request): Promise<BaseResponse<MessageResponse>> {
    const token = req.query.token as string;
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
    type: Auth,
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
    type: Auth,
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
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('defaultBearerAuth')
  async me(@GetUser() jwtPayload: UserPayload): Promise<BaseResponse<User>> {
    const user = await this.authService.me(jwtPayload);
    return {
      data: user,
    };
  }
}
