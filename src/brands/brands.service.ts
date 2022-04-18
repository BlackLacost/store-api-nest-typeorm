import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandsRepository: Repository<Brand>,
  ) {}

  create(createBrandDto: CreateBrandDto) {
    const brand = this.brandsRepository.create(createBrandDto);
    return this.brandsRepository.save(brand);
  }

  findAll() {
    return this.brandsRepository.find();
  }

  findOne(id: string) {
    return this.brandsRepository.findOne(id);
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brandForUpdate = await this.findOne(id);
    Object.assign(brandForUpdate, updateBrandDto);
    return this.brandsRepository.save(brandForUpdate);
  }

  async remove(id: string) {
    const brand = await this.findOne(id);
    const copy = { ...brand };
    await this.brandsRepository.remove(brand);
    return copy;
  }
}
