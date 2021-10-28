import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdicaoTabelaTodo1635216997312 implements MigrationInterface {
  name = 'AdicaoTabelaTodo1635216997312';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_todo" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "starts_at" date, "ends_at" date, "done" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7f6a01685c9b03c45916c067693" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_todo"`);
  }
}
