import { CreateUserDto, SignInDto } from './dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Res } from '@nestjs/common/decorators';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { use } from 'passport';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signIn(createUserDto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    const passwodMatches = await argon2.verify(
      user.password,
      createUserDto.password,
    );
    console.log({ createUserDto, user, passwodMatches });
    if (passwodMatches) {
      const token = await this.signToken({ id: user.id, email: user.email });
      return {
        access_token: token,
      };
    } else {
      throw new ForbiddenException({
        message: 'incorrect credentials',
        statusCode: 402,
      });
    }
  }
  async signUp(createUserDto: CreateUserDto) {
    const hashPassword = await argon2.hash(createUserDto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: hashPassword,
          name: createUserDto.email,
        },
      });
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          throw new ForbiddenException(
            { statusCode: 485, message: 'user existed' },
            'user already existed',
          );
        }
      }
    }
  }
  async signToken(user: { id: number; email: string }) {
    const token = await this.jwt.signAsync(
      { email: user.email, id: user.id },
      { secret: this.config.get('JWT_SECRET'), expiresIn: '15m' },
    );
    return token;
  }
}
