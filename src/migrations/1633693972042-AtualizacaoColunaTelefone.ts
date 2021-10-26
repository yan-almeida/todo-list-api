import { MigrationInterface, QueryRunner } from 'typeorm';

export class AtualizacaoColunaTelefone1633693972042
  implements MigrationInterface
{
  name = 'AtualizacaoColunaTelefone1633693972042';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tb_usuario" DROP COLUMN "telefone"`);
    await queryRunner.query(
      `ALTER TABLE "tb_usuario" ADD "telefone" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tb_usuario" DROP COLUMN "telefone"`);
    await queryRunner.query(
      `ALTER TABLE "tb_usuario" ADD "telefone" character varying(16)`,
    );
  }
}
