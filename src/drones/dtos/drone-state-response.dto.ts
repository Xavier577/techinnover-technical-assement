import { DroneState } from '@common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class DroneStateResponseDto {
  @ApiProperty()
  state: DroneState;
}
