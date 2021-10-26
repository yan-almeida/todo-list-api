import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdicaoTabelaUsuario1633558532534 implements MigrationInterface {
  name = 'AdicaoTabelaUsuario1633558532534';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_usuario" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nome_completo" character varying NOT NULL, "email" character varying NOT NULL, "telefone" character varying(16), "endereco" character varying, "senha" character varying NOT NULL, CONSTRAINT "PK_fea85fa13fe26913a53d66a44db" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_usuario"`);
  }
}
