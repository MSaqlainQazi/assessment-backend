import { IsNotEmpty } from "class-validator";
import { Bookings } from "../entities/booking.entity";

export namespace BookingsDto {
  export class CreateBookings {
    @IsNotEmpty()
    timeFrom: Date;

    @IsNotEmpty()
    timeTo: Date;

    @IsNotEmpty()
    areaId: number;

    @IsNotEmpty()
    parkingSlotId: number;
  }

  export class BookingReturnType {
    data: Bookings[];
    totalRecords: number;
  }

  export class BookParking {
    data: Bookings;
  }

  export class BookParkingReturnType {
    data: Bookings;
    message: string;
  }
}
