import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
export namespace UserDto {
  export class Login {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
  }

  export class CreateUser extends PartialType(Login) {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    name: string;
  }
}
