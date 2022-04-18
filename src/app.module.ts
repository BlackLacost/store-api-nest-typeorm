import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { SeedService } from './console/seed.console';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConsoleModule, ItemsModule],
  controllers: [],
  providers: [SeedService],
})
export class AppModule {}
