import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { ParkingRepository } from './parking.repository';
import { Parking } from './dto/parking.dto';
import { ParkingFloors } from './entities/parking-floors.entity';
@Injectable()
export class ParkingService {
  constructor(private parkingRepository: ParkingRepository) {}

  async findAll(): Promise<Parking.ParkingReturnType | Error> {
    try {
      const [data, totalRecords] = await this.parkingRepository
        .getAllParkingRecords()
        .getManyAndCount();

      const response = {
        data,
        totalRecords,
      };
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number): Promise<ParkingFloors | Error> {
    try {
      const floorRecord = await this.parkingRepository
        .getParkingById(id)
        .getOne();
      return floorRecord;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
