import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { HotOfferModule } from './hot-offer/hot-offer.module';

@Module({
  imports: [CategoryModule, HotOfferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
