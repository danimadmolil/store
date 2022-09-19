import { PartialType } from '@nestjs/mapped-types';
import { CreateHotOfferDto } from './create-hot-offer.dto';

export class UpdateHotOfferDto extends PartialType(CreateHotOfferDto) {}
