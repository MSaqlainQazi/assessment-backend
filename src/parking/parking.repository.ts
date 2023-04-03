import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { ParkingFloors } from './entities/parking-floors.entity';

@Injectable()
export class ParkingRepository extends Repository<ParkingFloors> {
  constructor(private dataSource: DataSource) {
    super(ParkingFloors, dataSource.createEntityManager());
  }

  public getParkingById(id: number): SelectQueryBuilder<ParkingFloors> {
    return this.createQueryBuilder('parking')
      .innerJoinAndSelect('parking.parkingSlots', 'parkingSlots')
      .where(`parking.id = :id`, { id });
  }

  public getParkingWithoutJoins(id: number): SelectQueryBuilder<ParkingFloors> {
    return this.createQueryBuilder('parking').where(`parking.id = :id`, { id });
  }

  public getAllParkingRecords(): SelectQueryBuilder<ParkingFloors> {
    return this.createQueryBuilder('parking').innerJoinAndSelect(
      'parking.parkingSlots',
      'parkingSlots'
    );
  }
}
