import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public getUserWithEmail(email: string): SelectQueryBuilder<User> {
    let query: SelectQueryBuilder<User>;
    query = this.createQueryBuilder('user').innerJoinAndSelect(
      'user.userRole',
      'userRole'
    );
    if (email !== null) {
      query = query.where(`user.email = :email`, {
        email,
      });
    }
    return query.orderBy('user.id', 'ASC');
  }

  public getUserById(id: number | null): SelectQueryBuilder<User> {
    let query: SelectQueryBuilder<User>;

    query = this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.password',
        'user.createdAt',
        'userRole.roleId',
        'user.updatedAt',
      ])
      .innerJoin('user.userRole', 'userRole');

    if (id !== null) {
      query = query.andWhere('user.id = :id', { id });
    }
    return query.orderBy('user.id', 'ASC');
  }
}
