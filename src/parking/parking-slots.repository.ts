import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { ParkingSlots } from './entities/parking-slots.entity';

@Injectable()
export class ParkingSlotsRepository extends Repository<ParkingSlots> {
  constructor(private dataSource: DataSource) {
    super(ParkingSlots, dataSource.createEntityManager());
  }

  public getParkingSlotsByAreaAndSlotId(
    id: number,
    areaId: number
  ): SelectQueryBuilder<ParkingSlots> {
    return this.createQueryBuilder('parkingSlots')
      .where(`parkingSlots.id = :id`, { id })
      .andWhere(`parkingSlots.areaId = :areaId`, { areaId });
  }
}
