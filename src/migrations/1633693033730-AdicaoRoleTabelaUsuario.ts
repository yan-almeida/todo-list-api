import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdicaoRoleTabelaUsuario1633693033730
  implements MigrationInterface
{
  name = 'AdicaoRoleTabelaUsuario1633693033730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_usuario" ADD "role" character varying(40) NOT NULL DEFAULT 'USER'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tb_usuario" DROP COLUMN "role"`);
  }
}
