import { MigrationInterface, QueryRunner } from 'typeorm';
import { Brand } from '../brands/entities/brand.entity';
import { brandsSeed } from '../brands/entities/brand.seed';

export class BrandSeed1650273890064 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      brandsSeed.map((brand) =>
        queryRunner.manager.create<Brand>(Brand, brand),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.clearTable('brand');
  }
}
