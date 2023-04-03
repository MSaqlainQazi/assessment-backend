import { EntityBase } from '../../base/entitybase';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParkingFloors } from './parking-floors.entity';

@Entity({ name: 'parking_slots' })
export class ParkingSlots extends EntityBase {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'parking_slot_name', type: 'varchar' })
  parkingSlotName: string;

  @Column({ name: 'is_booked', type: 'tinyint', default: false })
  isBooked: boolean;

  @Column({
    name: 'area_id',
    type: 'int',
  })
  public areaId: number;

  @ManyToOne((type) => ParkingFloors)
  @JoinColumn({
    name: 'area_id',
    referencedColumnName: 'id',
  })
  public area: ParkingFloors;
}
