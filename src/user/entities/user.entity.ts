import { Bookings } from '../../parking/bookings/entities/booking.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '../../base/entitybase';
import { UserRole } from './user-role.entity';
@Entity({ name: 'user' })
export class User extends EntityBase {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @OneToMany((type) => UserRole, (userRole) => userRole.user)
  userRole: UserRole[];

  @OneToMany((type) => Bookings, (slots) => slots.user)
  bookings: Bookings[];
}
