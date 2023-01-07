import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
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
import type { Request, Response } from 'express';
import { GetUser } from '~/common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';
import type { UserPayload } from './interfaces/auth.interface';
import { JwtPayloadResponse, UserResponse } from './models/auth.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterAuthDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserResponse,
    schema: {
      $ref: getSchemaPath(RegisterAuthDto),
    },
  })
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Get('verify')
  @ApiQuery({
    name: 'token',
  })
  verify(@Req() req: Request) {
    const token = req.query.token as string;
    if (!token) throw new BadRequestException('Token is required');
    return this.authService.verify(token);
  }

  @Post('login')
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been login successfully',
    type: JwtPayloadResponse,
  })
  login(@Body() loginAuthDto: LoginAuthDto, @Res() res: Response) {
    return this.authService.login(loginAuthDto, res);
  }

  @Get('refresh-token')
  @UseGuards(RefreshTokenGuard)
  @ApiResponse({
    status: 200,
    description: 'The user has been refresh token successfully',
  })
  refreshToken(@Req() req: Request, @Res() res: Response) {
    const { user } = req;
    return this.authService.refreshToken(user, res);
  }

  @Delete('logout')
  @UseGuards(RefreshTokenGuard)
  @ApiResponse({
    status: 200,
    description: 'The user has been logout successfully',
  })
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    status: 200,
    description: 'The user has been get successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('defaultBearerAuth')
  me(@GetUser() jwtPayload: UserPayload) {
    return this.authService.me(jwtPayload);
  }
}
