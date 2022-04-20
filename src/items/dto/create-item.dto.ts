import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray } from 'class-validator';
import { CreateItemInfoDto } from './create-item-info.dto';

export class CreateItemDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  image?: any;

  @ApiProperty({ description: 'Название бренда' })
  brand: string;

  @ApiProperty({ description: 'Тип товара' })
  type: string;

  @ApiPropertyOptional({ type: CreateItemInfoDto, isArray: true, default: [] })
  @Transform(({ value }) => JSON.parse(`[${value}]`))
  @IsArray()
  info?: CreateItemInfoDto[] = [];
}
