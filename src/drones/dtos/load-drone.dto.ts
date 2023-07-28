import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

export class MedItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @Matches(/^[A-Z0-9_]+$/, {
    message: 'only upper case letters, underscore and numbers are allowed',
  })
  @Length(10, 10, { message: 'code must be 10 characters long' })
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;
}

export class LoadDroneDto {
  @ApiProperty({
    type: MedItemDto,
    isArray: true,
    example: [
      {
        name: 'Hydrogen',
        weight: 226.98577458504587,
        weightLimit: 98,
        code: 'XP_3TV74SX',
        image: 'https://picsum.photos/seed/FnZF1ntxFA/640/480',
      },
      {
        name: 'Magnesium',
        weight: 120.51184300798923,
        weightLimit: 103,
        code: 'EL0A77C8Q3',
        image: 'https://loremflickr.com/640/480?lock=4843446057566208',
      },
    ],
  })
  @Type(() => MedItemDto)
  @IsArray()
  @ValidateNested({ each: true })
  items: MedItemDto[];
}
