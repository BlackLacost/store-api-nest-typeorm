import { Injectable } from '@nestjs/common';
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
  create(createTypeDto: CreateTypeDto) {
    const type = this.typesRepository.create(createTypeDto);
    return this.typesRepository.save(type);
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
