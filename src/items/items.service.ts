import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from '../brands/brands.service';
import { PageMetaDto } from '../common/pagination/page-meta.dto';
import { PageOptionsDto } from '../common/pagination/page-optioins.dto';
import { PageDto } from '../common/pagination/page.dto';
import { TypesService } from '../types/types.service';
import { CreateItemDto } from './dto/create-item.dto';
import { QueryItemDto } from './dto/query-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
    @Inject(BrandsService) private brandsService: BrandsService,
    @Inject(TypesService) private typesService: TypesService,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const { name, brand: brandName, type: typeName } = createItemDto;
    const item = await this.itemsRepository.findOne({ name });

    if (item) {
      throw new HttpException(
        `Товар ${item.name} уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const brand = await this.brandsService.preloadBrandByName(brandName);
    const type = await this.typesService.preloadTypeByName(typeName);

    const newItem = this.itemsRepository.create({
      ...createItemDto,
      brand,
      type,
    });
    return this.itemsRepository.save(newItem);
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    queryItemDto: QueryItemDto,
  ): Promise<PageDto<Item>> {
    const { brandName, typeName, brandId, typeId } = queryItemDto;
    const [entities, itemCount] = await this.itemsRepository.findAndCount({
      // Если указан id у него будет приоритет над именем, так как идет после
      ...(brandName && { where: { type: { name: brandName } } }),
      ...(typeName && { where: { type: { name: typeName } } }),
      ...(brandId && { where: { brand: { id: brandId } } }),
      ...(typeId && { where: { type: { id: typeId } } }),
      order: { name: pageOptionsDto.order },
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      relations: ['brand', 'type'],
    });

    const pageMetaDto = new PageMetaDto(pageOptionsDto, itemCount);
    return new PageDto(entities, pageMetaDto);
  }

  findOne(id: string) {
    return this.itemsRepository.findOne(id, { relations: ['brand', 'type'] });
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const { brand: brandName, type: typeName } = updateItemDto;
    const brand = await this.brandsService.preloadBrandByName(brandName);
    const type = await this.typesService.preloadTypeByName(typeName);
    const item = await this.itemsRepository.preload({
      ...updateItemDto,
      ...(brandName && { brand }),
      ...(typeName && { type }),
      id,
    });
    await this.itemsRepository.save(item);
    return this.findOne(item.id);
  }

  async remove(id: string) {
    const item = await this.itemsRepository.findOne(id);
    // Создаю копию, так как в оригинале id станет undefined
    // после удаления
    const copy = { ...item };
    await this.itemsRepository.remove(item);
    return copy;
  }

  async clear() {
    await this.itemsRepository.delete({});
    await this.brandsService.clear();
    return await this.typesService.clear();
  }
}
