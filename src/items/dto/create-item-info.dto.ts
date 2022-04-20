import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateItemInfoDto {
  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ default: '' })
  description?: string = '';
}
