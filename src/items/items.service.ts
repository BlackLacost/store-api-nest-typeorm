import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from '../brands/brands.service';
import { TypesService } from '../types/types.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

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

  findAll() {
    return this.itemsRepository.find({ relations: ['brand', 'type'] });
  }

  findOne(id: string) {
    return this.itemsRepository.findOne(id);
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
    return this.itemsRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.itemsRepository.findOne(id);
    // Создаю копию, так как в оригинале id станет undefined
    // после удаления
    const copy = { ...item };
    await this.itemsRepository.remove(item);
    return copy;
  }
}
