import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailService } from './email.service';
import { AuthHelper } from './helpers/auth.helper';
import { PasswordService } from './password.service';
import { AuthRepository } from './repositories/auth.repository';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    PasswordService,
    AuthHelper,
    EmailService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
