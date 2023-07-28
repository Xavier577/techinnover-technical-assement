import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class SerialNumberDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  serialNumber: string;
}
