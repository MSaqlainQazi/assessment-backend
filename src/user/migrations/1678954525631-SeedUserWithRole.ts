import { MigrationInterface, QueryRunner } from "typeorm";
import { UsersEnum } from "../common/enums";

export class SeedUserWithRole1678954525631 implements MigrationInterface {
  name = "SeedUserWithRole1678954525631";

  public async up(queryRunner: QueryRunner): Promise<void> {
    Object.values(UsersEnum).forEach(async (item) => {
      await queryRunner.query(
        `INSERT into user (created_at, updated_at, name, email, password) Values (now(), now(), '${item}', '${item}@gmail.com', '${item}@123')`
      );

      const [userId] = await queryRunner.query(
        `SELECT id FROM user WHERE email LIKE '${item}@gmail.com'`
      );

      await queryRunner.query(
        `INSERT into user_role (created_at, updated_at, role_id, user_id) Values (now(), now(), '1', '${userId.id}')`
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("TRUNCATE TABLE user;");
    queryRunner.query("TRUNCATE TABLE user_role;");
  }
}
