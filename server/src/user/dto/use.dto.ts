import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  email: string;
}
export class UserDeleteDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  name: string;
}
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  password?: string;
}
