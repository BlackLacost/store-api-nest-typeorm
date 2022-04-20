import { PartialType } from '@nestjs/swagger';
import { CreateItemInfoDto } from './create-item-info.dto';

export class UpdateItemInfoDto extends PartialType(CreateItemInfoDto) {}
