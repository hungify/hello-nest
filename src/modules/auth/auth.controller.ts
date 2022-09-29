import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtGuard } from './guards/jwt.guard';
import { AuthJwtPayload } from './interfaces/auth.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto, @Res() res: Response) {
    return this.authService.login(loginAuthDto, res);
  }

  @Get('refresh-token')
  refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  me(@User() reqUser: AuthJwtPayload) {
    return this.authService.me(reqUser);
  }
}
