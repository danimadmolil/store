import { CreateUserDto, SignInDto } from './dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Res } from '@nestjs/common/decorators';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { use } from 'passport';
import { Request, Response } from 'express';
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
    if (!user) {
      throw new ForbiddenException('the username or password is incorrect');
    }
    //check whether user password is correct or not
    const passwodMatches = await argon2.verify(
      user.password,
      createUserDto.password,
    );
    delete user.password;
    if (passwodMatches) {
      //generate access_token and refresh_tokens
      const tokens = await this.getTokens({ id: user.id, email: user.email });
      const hashedRefreshToken = await argon2.hash(tokens.refreshToken.token);
      //save refresh_token in on the user table
      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: hashedRefreshToken },
      });
      //return a response with user and access_token and refresh_token
      delete user.id;
      delete user.refreshToken;
      return {
        user: user,
        auth: {
          refresh_token: tokens.refreshToken,
          access_token: tokens.accessToken,
        },
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
  async getTokens(user: { id: number; email: string }) {
    const [accessToken, refreshToken] = [
      await this.jwt.signAsync(
        { id: user.id, email: user.email },
        {
          secret: this.config.get('JWT_SECRET'),
          expiresIn: '15m',
        },
      ),
      await this.jwt.signAsync(
        { id: user.id, email: user.email },
        {
          secret: this.config.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ];
    return {
      accessToken: {
        token: accessToken,
        expiresIn: Date.now() + 15 * 60 * 1000,
      },
      refreshToken: {
        token: refreshToken,
        expiresIn: Date.now() + 7 * 24 * 60 * 60 * 1000,
      },
    };
  }
  async refreshToken(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const rtMatches = await argon2.verify(user.refreshToken, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens({ id: user.id, email: user.email });
    // await this.updateRtHash(user.id, tokens.refreshToken.token);
    return tokens.accessToken;
  }
  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon2.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }
}
