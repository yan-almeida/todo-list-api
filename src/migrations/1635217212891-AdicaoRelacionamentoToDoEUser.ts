import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdicaoRelacionamentoToDoEUser1635217212891
  implements MigrationInterface
{
  name = 'AdicaoRelacionamentoToDoEUser1635217212891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_to_do" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "starts_at" date, "ends_at" date, "done" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "PK_5f00c81b2b21b76b4022ecc4844" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_to_do" ADD CONSTRAINT "FK_553bd8535642bd4c221fd8e9af3" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_to_do" DROP CONSTRAINT "FK_553bd8535642bd4c221fd8e9af3"`,
    );
    await queryRunner.query(`DROP TABLE "tb_to_do"`);
  }
}
