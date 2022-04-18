import { MigrationInterface, QueryRunner } from 'typeorm';
import { Type } from '../types/entities/type.entity';
import { typesSeed } from '../types/entities/type.seed';

export class TypeSeed1650263200122 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      typesSeed.map((type) => queryRunner.manager.create<Type>(Type, type)),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('type');
  }
}
