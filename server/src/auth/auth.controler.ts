import { CreateUserDto, SignInDto } from './dto';
import { PrismaService } from './../prisma/prisma.service';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signUp(@Body() createUser: CreateUserDto) {
    return this.authService.signUp(createUser);
  }
  @Post('signin')
  signIn(@Body() credentials: SignInDto) {
    return this.authService.signIn(credentials);
  }
}
