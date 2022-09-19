import { Test, TestingModule } from '@nestjs/testing';
import { HotOfferService } from './hot-offer.service';

describe('HotOfferService', () => {
  let service: HotOfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotOfferService],
    }).compile();

    service = module.get<HotOfferService>(HotOfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
