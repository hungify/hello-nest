import { OmitType } from '@nestjs/swagger';
import { RegisterAuthDto } from './register-auth.dto';

export class LoginAuthDto extends OmitType(RegisterAuthDto, [
  'fullName',
] as const) {}
