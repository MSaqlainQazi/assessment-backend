import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { TransactionScope } from '../../base/transactionScope';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService extends BaseService {
  constructor(private userRepository: UserRepository) {
    super();
  }
  async commitTransaction(ts: TransactionScope) {
    await ts.commit();
  }

  async getUserById(id: number) {
    try {
      const user = await this.userRepository.getUserById(id).getOne();
      if (!user) {
        throw new BadRequestException("this user doesn't exist");
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
