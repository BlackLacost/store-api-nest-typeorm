import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesModule } from './types/types.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TypesModule, BrandsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
