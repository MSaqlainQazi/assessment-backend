import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsBookedColumnInParkingSlots1679490014708 implements MigrationInterface {
    name = 'AddIsBookedColumnInParkingSlots1679490014708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parking_slots\` ADD \`is_booked\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parking_slots\` DROP COLUMN \`is_booked\``);
    }

}
