import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import type { Observable } from 'rxjs';
import { JWTService } from '../jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JWTService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;
    const token = this.jwtService.getTokenFromBearerOrCookie(
      authHeader,
      'bearer',
    );

    const payload = this.jwtService.verifyToken(token, 'accessToken');

    request.user = payload;

    return true;
  }
}
