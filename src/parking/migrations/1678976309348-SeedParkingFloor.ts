import { MigrationInterface, QueryRunner } from "typeorm";
import { parkingFloors, ParkingFloorsTypes } from "../common/constants";

export class SeedParkingFloor1678976309348 implements MigrationInterface {
  name = "SeedParkingFloor1678976309348";

  public async up(queryRunner: QueryRunner): Promise<void> {
    parkingFloors.forEach(async (item: ParkingFloorsTypes) => {
      await queryRunner.query(
        `INSERT into parking_floors (created_at, updated_at, area_name, slots_count) Values (now(), now(), '${item.name}', ${item.slots})`
      );

      const [{ id, slots_count }] = await queryRunner.query(
        `SELECT id, slots_count FROM parking_floors WHERE area_name LIKE '${item.name}'`
      );

      const slotsCountArr = [];
      for (let i = 1; i <= slots_count; i++) {
        slotsCountArr.push(i);
      }

      slotsCountArr.forEach(async (item) => {
        await queryRunner.query(
          `INSERT into parking_slots (created_at, updated_at, parking_slot_name, area_id) Values (now(), now(), 'slots ${item}', ${id})`
        );
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("TRUNCATE TABLE parking_floors;");
    queryRunner.query("TRUNCATE TABLE parking_slots;");
  }
}
