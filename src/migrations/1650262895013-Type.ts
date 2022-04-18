import { MigrationInterface, QueryRunner } from 'typeorm';

export class Type1650262895013 implements MigrationInterface {
  name = 'Type1650262895013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_e23bfe7255ada131861292923fe" UNIQUE ("name"), CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "type"`);
  }
}
