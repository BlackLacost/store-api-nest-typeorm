import { Module } from '@nestjs/common';
import { TypesModule } from './types/types.module';

@Module({
  imports: [TypesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
