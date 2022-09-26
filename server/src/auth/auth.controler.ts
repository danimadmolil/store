import { CreateUserDto, SignInDto } from './dto';
import { PrismaService } from './../prisma/prisma.service';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetCurrentUserId } from './decorators/GetUserId';
import { GetCurrentUser } from './decorators/GetCurrentUser';

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
  @Get('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refresh(
    @GetCurrentUserId() id: number,
    @GetCurrentUser('refreshToken') rt: string,
  ) {
    return this.authService.refreshToken(id, rt);
  }
}
