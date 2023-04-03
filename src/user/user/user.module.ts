import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { RoleRepository } from '../role/role.repository';
import { AuthService } from '../auth/auth.service';
import { jwtConstants } from '../auth/constants';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/role/roles.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    RoleRepository,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class UserModule {}
