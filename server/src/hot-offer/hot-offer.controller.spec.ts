import { Test, TestingModule } from '@nestjs/testing';
import { HotOfferController } from './hot-offer.controller';
import { HotOfferService } from './hot-offer.service';

describe('HotOfferController', () => {
  let controller: HotOfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotOfferController],
      providers: [HotOfferService],
    }).compile();

    controller = module.get<HotOfferController>(HotOfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
