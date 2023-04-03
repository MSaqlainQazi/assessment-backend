import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  public getRoleWithName(role: string): SelectQueryBuilder<Role> {
    return this.createQueryBuilder('role').where(`role.role = :role`, { role });
  }
  public getRoleById(id: number): SelectQueryBuilder<Role> {
    return this.createQueryBuilder('role')
      .select(['role.id', 'role.role'])
      .where(`role.id = :id`, { id });
  }
}
