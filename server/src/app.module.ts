import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { HotOfferModule } from './hot-offer/hot-offer.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    HotOfferModule,
    AuthModule,
    PrismaModule,
    JwtModule.register({}),
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
