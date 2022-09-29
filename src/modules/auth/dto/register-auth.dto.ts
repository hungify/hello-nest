import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @Length(3, 20)
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
