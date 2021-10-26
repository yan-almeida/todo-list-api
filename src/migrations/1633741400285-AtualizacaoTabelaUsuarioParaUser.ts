import { MigrationInterface, QueryRunner } from 'typeorm';

export class AtualizacaoTabelaUsuarioParaUser1633741400285
  implements MigrationInterface
{
  name = 'AtualizacaoTabelaUsuarioParaUser1633741400285';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_user" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "full_name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" character varying, "address" character varying, "role" character varying(40) NOT NULL DEFAULT 'USER', "password" character varying NOT NULL, CONSTRAINT "PK_1943338f8f00e074a3c5bb48d5e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_user"`);
  }
}
