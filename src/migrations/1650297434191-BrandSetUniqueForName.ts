import { MigrationInterface, QueryRunner } from 'typeorm';

export class BrandSetUniqueForName1650297434191 implements MigrationInterface {
  name = 'BrandSetUniqueForName1650297434191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "UQ_5f468ae5696f07da025138e38f7"`,
    );
  }
}
