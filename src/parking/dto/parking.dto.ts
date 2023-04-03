import { ParkingFloors } from '../entities/parking-floors.entity';

export namespace Parking {
  export class ParkingReturnType {
    data: ParkingFloors[];
    totalRecords: number;
  }
}
