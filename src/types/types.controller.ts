import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';
import { TypesService } from './types.service';

@Controller('types')
@ApiTags('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @ApiCreatedResponse({ type: Type })
  @ApiUnprocessableEntityResponse({ description: `Тип уже существует` })
  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto);
  }

  @ApiOkResponse({ type: [Type] })
  @Get()
  findAll() {
    return this.typesService.findAll();
  }

  @ApiOkResponse({ type: Type })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesService.findOne(id);
  }

  @ApiCreatedResponse({ type: Type })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typesService.update(id, updateTypeDto);
  }

  @ApiOkResponse({ type: Type })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Type> {
    return this.typesService.remove(id);
  }
}
