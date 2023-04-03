import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Request,
  Delete,
  Param,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/user/auth/guards/jwt/jwt-auth.guard";
import { BookingsService } from "./bookings.service";
import { BookingsDto } from "./dto/create-booking.dto";
import { Bookings } from "./entities/booking.entity";

@Controller("bookings")
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Request() req, @Body() createBookingDto: BookingsDto.CreateBookings) {
    try {
      return await this.bookingsService.create(req.user.sub, createBookingDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async  findAll(@Request() req): Promise<BookingsDto.BookingReturnType | Error> {
    try {
      return await this.bookingsService.findAll(req.user.sub);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<Bookings | Error> {
    try {
      return await this.bookingsService.remove(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
