import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService, private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    delete user.password;
    return user;
  }
}
