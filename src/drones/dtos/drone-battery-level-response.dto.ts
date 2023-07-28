import { ApiProperty } from '@nestjs/swagger';

export class DroneBatteryLevelResponseDto {
  @ApiProperty()
  batteryLevel: number;
}
