import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JWTService } from '../jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JWTService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;
    if (!authHeader)
      throw new UnauthorizedException("Header 'Authorization' is required");

    const token = this.jwtService.getTokenFromBearerOrCookie(
      authHeader,
      'bearer',
    );

    const payload = await this.jwtService.verifyToken(token, 'accessToken');

    request.user = payload;

    return true;
  }
}
