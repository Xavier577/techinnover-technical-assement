import { DroneModel, DroneState } from '@common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Max, IsEnum } from 'class-validator';

export class RegisterDroneDto {
  @ApiProperty({ description: "drone's battery capacity" })
  @IsInt()
  @Max(100)
  @IsNotEmpty()
  batteryCapacity: number;

  @ApiProperty({
    type: 'string',
    enum: DroneModel,
    description: "drone's model",
  })
  @IsString()
  @IsEnum(DroneModel)
  @IsNotEmpty()
  model: DroneModel;

  @ApiProperty({
    type: 'string',
    enum: DroneState,
    description: "drone's current state",
  })
  @IsString()
  @IsEnum(DroneState)
  @IsNotEmpty()
  state: DroneState;

  @ApiProperty({ description: 'max weight that can be loaded on drone' })
  @IsInt()
  @Max(500)
  @IsNotEmpty()
  weightLimit: number;
}
