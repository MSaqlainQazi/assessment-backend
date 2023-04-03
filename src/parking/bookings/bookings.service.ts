import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { TransactionScope } from "src/base/transactionScope";
import { UserRepository } from "src/user/user/user.repository";
import { ParkingSlotsRepository } from "../parking-slots.repository";
import { ParkingRepository } from "../parking.repository";
import { BookngRepository } from "./booking.repository";
import { BookingsDto } from "./dto/create-booking.dto";
import { Bookings } from "./entities/booking.entity";
import { ParkingSlots } from "../entities/parking-slots.entity";

@Injectable()
export class BookingsService extends BaseService {
  constructor(
    private userRepository: UserRepository,
    private parkingRepository: ParkingRepository,
    private parkingSlotsRepository: ParkingSlotsRepository,
    private bookingRepository: BookngRepository
  ) {
    super();
  }

  async commitTransaction(ts: TransactionScope) {
    await ts.commit();
  }

  async getRecords(userId: number, input: BookingsDto.CreateBookings) {
    const user = await this.userRepository.getUserById(userId).getOne();
    if (!user) throw new BadRequestException("user doesn't exist");

    const area = await this.parkingRepository
      .getParkingWithoutJoins(input.areaId)
      .getOne();
    if (!area) throw new BadRequestException(`Invalid area id ${input.areaId}`);

    const parkingSlot = await this.parkingSlotsRepository
      .getParkingSlotsByAreaAndSlotId(input.parkingSlotId, input.areaId)
      .getOne();

    if (!parkingSlot)
      throw new BadRequestException(
        `this ${input.parkingSlotId} id doesn't exist in area ${input.areaId}`
      );
   
    return { user, area, parkingSlot };
  }

  async create(userId: number, input: BookingsDto.CreateBookings) {
    try {
      const records = await this.getRecords(userId, input);

      const transactionScope = this.getTransactionScope();
      const bookings = new Bookings();
      bookings.timeFrom = input.timeFrom;
      bookings.timeTo = input.timeTo;
      bookings.area = records.area;
      bookings.user = records.user;
      bookings.parkingSlot = records.parkingSlot;
      records.parkingSlot.isBooked = true;
      transactionScope.add(bookings);
      transactionScope.update(records.parkingSlot);
      await this.commitTransaction(transactionScope);
      return { bookings, message: "Book Successfully" };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(
    userId: number
  ): Promise<BookingsDto.BookingReturnType | Error> {
    try {
      const [data, totalRecords] = await this.bookingRepository
        .getBookingByUserId(userId)
        .getManyAndCount();
      return {
        data,
        totalRecords,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, ts?: TransactionScope) {
    try {
      const booking = await this.bookingRepository.getBookingById(id).getOne();
      if (!booking) throw new BadRequestException(`Invalid booking id ${id}`);
      const transactionScope = ts ? ts : this.getTransactionScope();

      transactionScope.hardDelete(booking);
      await this.commitTransaction(transactionScope);

      return booking;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
