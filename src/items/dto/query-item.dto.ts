import { ApiProperty } from '@nestjs/swagger';

export class QueryItemDto {
  @ApiProperty({ required: false })
  brandId?: string;

  @ApiProperty({ required: false })
  typeId?: string;

  @ApiProperty({ required: false })
  brandName?: string;

  @ApiProperty({ required: false })
  typeName?: string;
}
