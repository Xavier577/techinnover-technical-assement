import { ApiProperty } from '@nestjs/swagger';

export class ProductCodeDto {
  @ApiProperty()
  code: string;
}
