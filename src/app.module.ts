import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesModule } from './types/types.module';
import { BrandsModule } from './brands/brands.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TypesModule, BrandsModule, ItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
