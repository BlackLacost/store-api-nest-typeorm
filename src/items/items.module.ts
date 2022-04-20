import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from '../brands/brands.module';
import { TypesModule } from '../types/types.module';
import { ItemInfo } from './item-info.entity';
import { Item } from './item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, ItemInfo]),
    BrandsModule,
    TypesModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
