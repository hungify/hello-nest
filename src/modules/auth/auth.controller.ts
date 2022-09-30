import {
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
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { GetUser } from 'src/common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtGuard } from './guards/jwt.guard';
import { AuthJwtPayload } from './interfaces/auth.interface';
import { JwtPayloadResponse, UserResponse } from './models/auth';

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
  @ApiResponse({
    status: 200,
    description: 'The user has been refresh token successfully',
  })
  refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Delete('logout')
  @ApiResponse({
    status: 200,
    description: 'The user has been logout successfully',
  })
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 200,
    description: 'The user has been get successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('defaultBearerAuth')
  me(@GetUser() jwtPayload: AuthJwtPayload) {
    return this.authService.me(jwtPayload);
  }
}
