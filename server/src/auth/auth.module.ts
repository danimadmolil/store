import { AuthController } from './auth.controler';
import { AuthService } from './auth.service';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { JwtRefreshToken } from './strategy/refreshToken.strategy';
@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshToken],
  exports: [AuthService],
})
@Global()
export class AuthModule {}
