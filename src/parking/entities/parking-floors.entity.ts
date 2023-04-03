import { EntityBase } from '../../base/entitybase';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ParkingAreasEnum } from '../common/enums';
import { IsEnum } from 'class-validator';
import { ParkingSlots } from './parking-slots.entity';
import { Bookings } from '../bookings/entities/booking.entity';

@Entity({ name: 'parking_floors' })
export class ParkingFloors extends EntityBase {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  id: number;

  @IsEnum(ParkingAreasEnum)
  @Column({ name: 'area_name', type: 'varchar', unique: true })
  areaName: string;

  @Column({ name: 'slots_count', type: 'int' })
  slotsCount: number;

  @OneToMany((type) => ParkingSlots, (slots) => slots.area)
  parkingSlots: ParkingSlots[];

  @OneToMany((type) => Bookings, (slots) => slots.area)
  bookings: Bookings[];
}
