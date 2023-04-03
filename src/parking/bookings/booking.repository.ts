import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Bookings } from './entities/booking.entity';

@Injectable()
export class BookngRepository extends Repository<Bookings> {
  constructor(private dataSource: DataSource) {
    super(Bookings, dataSource.createEntityManager());
  }

  public getBookingByUserId(userId: number): SelectQueryBuilder<Bookings> {
    return this.createQueryBuilder('bookings')
      .innerJoinAndSelect('bookings.parkingSlot', 'parkingSlot')
      .where(`bookings.userId = :userId`, { userId });
  }
  public getBookingById(id: number): SelectQueryBuilder<Bookings> {
    return this.createQueryBuilder('bookings').where(`bookings.id = :id`, {
      id,
    });
  }
}
