import {
  isEmail,
  IsNotEmpty,
  IsEmail,
  isString,
  isNotEmpty,
  IsString,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'email field should not be empty' })
  @IsEmail({}, { message: 'please enter a valid email' })
  email: string;
  @IsNotEmpty({ message: 'password should not be empty' })
  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  name?: string;
}
export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
