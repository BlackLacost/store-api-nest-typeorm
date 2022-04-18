import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesModule } from './types/types.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TypesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
