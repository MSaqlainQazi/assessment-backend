import { ParkingFloors } from 'src/parking/entities/parking-floors.entity';
import { User } from '../../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityBase } from '../../../base/entitybase';
import { ParkingSlots } from 'src/parking/entities/parking-slots.entity';

@Entity({ name: 'bookings' })
export class Bookings extends EntityBase {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'time_from', type: 'datetime' })
  timeFrom: Date;

  @Column({ name: 'time_to', type: 'datetime' })
  timeTo: Date;

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

  @Column({
    name: 'user_id',
    type: 'int',
  })
  public userId: number;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  public user: User;

  @OneToOne(() => ParkingSlots)
  @JoinColumn({
    name: 'parking_slot',
  })
  parkingSlot: ParkingSlots;
}
