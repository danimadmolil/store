import { Injectable } from '@nestjs/common';
import { CreateHotOfferDto } from './dto/create-hot-offer.dto';
import { UpdateHotOfferDto } from './dto/update-hot-offer.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
@Injectable()
export class HotOfferService {
  create(createHotOfferDto: CreateHotOfferDto) {
    return 'This action adds a new hotOffer';
  }

  findAll() {
    return prisma.hotOffers.findMany({include:{HotOffersOnProduct:{include:{product:true}}}});
  }

  findOne(id: number) {
    return prisma.hotOffers.findMany({where:{id:id},include:{HotOffersOnProduct:{include:{product:true}}}});

  }

  update(id: number, updateHotOfferDto: UpdateHotOfferDto) {
    return `This action updates a #${id} hotOffer`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotOffer`;
  }
}
