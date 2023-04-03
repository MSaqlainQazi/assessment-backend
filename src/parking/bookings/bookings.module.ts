import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { ParkingRepository } from '../parking.repository';
import { ParkingSlotsRepository } from '../parking-slots.repository';
import { UserRepository } from '../../user/user/user.repository';
import { BookngRepository } from './booking.repository';

@Module({
  controllers: [BookingsController],
  providers: [
    BookingsService,
    ParkingRepository,
    ParkingSlotsRepository,
    UserRepository,
    BookngRepository,
  ],
})
export class BookingsModule {}
