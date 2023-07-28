import { DroneModel, DroneState } from '@common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class DroneDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  batteryCapacity: number;

  @ApiProperty()
  model: DroneModel;

  @ApiProperty()
  serialNumber: string;

  @ApiProperty()
  state: DroneState;

  @ApiProperty()
  weightLimit: number;
}
