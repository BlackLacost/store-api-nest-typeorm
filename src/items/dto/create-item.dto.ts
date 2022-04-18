import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ required: false })
  image?: string;

  @ApiProperty({ description: 'Название бренда' })
  brand: string;

  @ApiProperty({ description: 'Тип товара' })
  type: string;
}
