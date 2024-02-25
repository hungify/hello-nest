import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { AuthRepository } from './auth.repository';
import { AuthHelper } from './auth.helper';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    PasswordService,
    AuthHelper,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
