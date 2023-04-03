import {
  Controller,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { Parking } from './dto/parking.dto';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get('floors')
  async findAll(): Promise<Parking.ParkingReturnType | Error> {
    try {
      return await this.parkingService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.parkingService.findOne(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
