import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type) private typesRepository: Repository<Type>,
  ) {}

  async create(createTypeDto: CreateTypeDto) {
    const { name: typeName } = createTypeDto;
    if (await this.typesRepository.findOne({ name: typeName })) {
      throw new HttpException(
        `Тип ${typeName} уже существует`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const brand = this.typesRepository.create(createTypeDto);
    return this.typesRepository.save(brand);
  }

  findAll() {
    return this.typesRepository.find();
  }

  findOne(id: string) {
    return this.typesRepository.findOne(id);
  }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    const typeForUpdated = await this.findOne(id);
    Object.assign(typeForUpdated, updateTypeDto);
    return this.typesRepository.save(typeForUpdated);
  }

  async remove(id: string) {
    const type = await this.findOne(id);
    const typeCopy = { ...type };
    await this.typesRepository.remove(type);
    return typeCopy;
  }
}
