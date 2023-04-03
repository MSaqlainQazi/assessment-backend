import { RolesEnum } from '../common/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum } from 'class-validator';
import { EntityBase } from '../../base/entitybase';
@Entity({ name: 'role' })
export class Role extends EntityBase {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  id: number;

  @IsEnum(RolesEnum)
  @Column({
    name: 'role',
    type: 'varchar',
  })
  role: string;
}
