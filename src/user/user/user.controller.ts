import {
  Controller,
  Get,
  Post,
  Request,
  Param,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { LocalAuthGuard } from "../auth/guards/local/local-auth.guard";
import { AuthService } from "../auth/auth.service";
import { JwtAuthGuard } from "../auth/guards/jwt/jwt-auth.guard";

@Controller("auth")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService
  ) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    const { access_token } = await this.authService.getToken(req.user);
    return { access_token, message: "Login Successfully" };
  }

  @Get("me/:id")
  @UseGuards(JwtAuthGuard)
  async findOne(@Request() req, @Param("id") id: number) {
    return this.userService.getUserById(+id);
  }
}
