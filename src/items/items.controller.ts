import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { ApiPaginatedResponse } from '../common/pagination/api-paginated-response.decorator';
import { PageOptionsDto } from '../common/pagination/page-optioins.dto';
import { PageDto } from '../common/pagination/page.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { QueryItemDto } from './dto/query-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.entity';
import { ItemsService } from './items.service';

@ApiTags('items')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiCreatedResponse({ type: Item })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateItemDto })
  @ApiUnprocessableEntityResponse({ description: 'Товар уже существует' })
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/item-images',
        filename: (_, file, cb) => {
          cb(null, `${randomUUID()}_${file.originalname}`);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.includes('image')) {
          return cb(
            new BadRequestException('Поддерживаются только картинки'),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 2), // 1 MB
      },
    }),
  )
  create(
    @Body() createItemDto: CreateItemDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.itemsService.create({
      ...createItemDto,
      image: image?.filename,
    });
  }

  @ApiPaginatedResponse(Item)
  @Get()
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() queryItemDto: QueryItemDto,
  ): Promise<PageDto<Item>> {
    return this.itemsService.findAll(pageOptionsDto, queryItemDto);
  }

  @ApiOkResponse({ type: Item })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @ApiCreatedResponse({ type: Item })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateItemDto })
  @ApiUnprocessableEntityResponse({ description: 'Товар уже существует' })
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/item-images',
        filename: (_, file, cb) => {
          cb(null, `${randomUUID()}_${file.originalname}`);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.includes('image')) {
          return cb(
            new BadRequestException('Поддерживаются только картинки'),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 2), // 1 MB
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.itemsService.update(id, {
      ...updateItemDto,
      image: image.filename,
    });
  }

  @ApiOkResponse({ type: Item })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
