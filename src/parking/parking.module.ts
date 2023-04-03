import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { ParkingRepository } from './parking.repository';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService, ParkingRepository],
  imports: [BookingsModule],
})
export class ParkingModule {}
