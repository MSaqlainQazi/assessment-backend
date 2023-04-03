import { MigrationInterface, QueryRunner } from "typeorm";

export class ParkingBookings1679044946642 implements MigrationInterface {
    name = 'ParkingBookings1679044946642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bookings\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`time_from\` datetime NOT NULL, \`time_to\` datetime NOT NULL, \`area_id\` int NOT NULL, \`user_id\` int NOT NULL, \`parking_slot\` int NULL, UNIQUE INDEX \`REL_4d117acd411b406185ee90f6fd\` (\`parking_slot\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_aaf66b580cd58bcfadf6b62e821\` FOREIGN KEY (\`area_id\`) REFERENCES \`parking_floors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_64cd97487c5c42806458ab5520c\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_4d117acd411b406185ee90f6fd9\` FOREIGN KEY (\`parking_slot\`) REFERENCES \`parking_slots\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_4d117acd411b406185ee90f6fd9\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_64cd97487c5c42806458ab5520c\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_aaf66b580cd58bcfadf6b62e821\``);
        await queryRunner.query(`DROP INDEX \`REL_4d117acd411b406185ee90f6fd\` ON \`bookings\``);
        await queryRunner.query(`DROP TABLE \`bookings\``);
    }

}
