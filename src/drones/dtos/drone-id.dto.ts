import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DroneIdDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
