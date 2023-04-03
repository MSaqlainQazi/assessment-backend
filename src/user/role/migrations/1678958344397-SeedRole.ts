import { RolesEnum } from 'src/user/common/enums';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRole1678958344397 implements MigrationInterface {
  name = 'SeedRole1678958344397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    Object.values(RolesEnum).forEach(async (item: string) => {
      await queryRunner.query(
        `INSERT into role (created_at, updated_at, role) Values (now(), now(), '${item}')`
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('TRUNCATE TABLE role;');
  }
}
