import { UserRepository } from "../user/user.repository";
import { User } from "../entities/user.entity";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: User = await this.userRepository
      .getUserWithEmail(email)
      .getOne();

    if (!user) {
      throw new UnauthorizedException();
    }

    if (pass === user.password) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new BadRequestException("Username and password is invalid");
    }
  }

  async getToken(user: User) {
    try {
      const payload = {
        username: user.name,
        sub: user.id,
        role: user.userRole,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
