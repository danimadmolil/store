import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotOfferService } from './hot-offer.service';
import { CreateHotOfferDto } from './dto/create-hot-offer.dto';
import { UpdateHotOfferDto } from './dto/update-hot-offer.dto';

@Controller('hot-offer')
export class HotOfferController {
  constructor(private readonly hotOfferService: HotOfferService) {}

  @Post()
  create(@Body() createHotOfferDto: CreateHotOfferDto) {
    return this.hotOfferService.create(createHotOfferDto);
  }

  @Get()
  findAll() {
    return this.hotOfferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotOfferService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotOfferDto: UpdateHotOfferDto) {
    return this.hotOfferService.update(+id, updateHotOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotOfferService.remove(+id);
  }
}
