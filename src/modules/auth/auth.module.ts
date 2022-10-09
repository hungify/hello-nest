import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailService } from './email.service';
import { JWTService } from './jwt.service';
import { PasswordService } from './password.service';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    PasswordService,
    JWTService,
    JwtService,
    EmailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
