import { RolesEnum } from '../../../common/enums';
import { User } from '../../../entities/user.entity';
import { UserRole } from '../../../entities/user-role.entity';
import { RoleRepository } from '../../../role/role.repository';
import { UserRepository } from '../../../user/user.repository';
import { ROLES_KEY } from './role.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleRepository: RoleRepository,
    private userRepository: UserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<Boolean | any> {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) {
      return true;
    }
    const userId = context.switchToHttp().getRequest();
    const user: User = await this.userRepository
      .getUserById(userId.params.id)
      .getOne();

    let roles;
    const roless = [];
    if (user) {
      await new Promise((resolve, reject) => {
        user.userRole.forEach(async (element: UserRole) => {
          let role = await this.roleRepository
            .getRoleById(element.roleId)
            .getOne();

          roless.push(role);
          resolve(roless);
        });
      }).then((data) => {
        roles = data;
      });
    }

    return roles.some((role) => requiredRoles.includes(role.role));
  }
}
