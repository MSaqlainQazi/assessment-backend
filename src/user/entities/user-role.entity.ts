import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityBase } from '../../base/entitybase';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity({ name: 'user_role' })
export class UserRole extends EntityBase {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  public id: number;

  @Column({
    name: 'role_id',
    type: 'int',
  })
  public roleId: number;

  @ManyToOne((type) => Role)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
  })
  public role: Role;

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
}
