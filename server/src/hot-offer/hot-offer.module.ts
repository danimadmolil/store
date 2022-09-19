import { Module } from '@nestjs/common';
import { HotOfferService } from './hot-offer.service';
import { HotOfferController } from './hot-offer.controller';

@Module({
  controllers: [HotOfferController],
  providers: [HotOfferService]
})
export class HotOfferModule {}
