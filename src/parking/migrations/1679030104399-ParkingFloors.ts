import { MigrationInterface, QueryRunner } from "typeorm";

export class ParkingFloors1679030104399 implements MigrationInterface {
    name = 'ParkingFloors1679030104399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`parking_slots\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`parking_slot_name\` varchar(255) NOT NULL, \`area_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`parking_floors\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`area_name\` varchar(255) NOT NULL, \`slots_count\` int NOT NULL, UNIQUE INDEX \`IDX_c35606e13bfc2281d77d9b45aa\` (\`area_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`parking_slots\` ADD CONSTRAINT \`FK_a54fe395ff3b378c0cdab7b9d7a\` FOREIGN KEY (\`area_id\`) REFERENCES \`parking_floors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parking_slots\` DROP FOREIGN KEY \`FK_a54fe395ff3b378c0cdab7b9d7a\``);
        await queryRunner.query(`DROP INDEX \`IDX_c35606e13bfc2281d77d9b45aa\` ON \`parking_floors\``);
        await queryRunner.query(`DROP TABLE \`parking_floors\``);
        await queryRunner.query(`DROP TABLE \`parking_slots\``);
    }

}
