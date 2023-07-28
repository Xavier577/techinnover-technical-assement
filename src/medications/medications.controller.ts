import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MedicationsService } from './services/medications.service';
import { ProductCodeDto } from '@medications/dtos/product-code.dto';

@ApiTags('Medications')
@Controller('medications')
export class MedicationsController {
  private readonly logger = new Logger(MedicationsController.name);

  constructor(private readonly medicationsService: MedicationsService) {}

  @Get('product-code')
  @ApiOperation({
    summary: 'generate a unique product code',
    description:
      'this would generate a unique product code for a medication item',
  })
  @ApiResponse({ status: 200, type: ProductCodeDto })
  public async generateProductCode(): Promise<ProductCodeDto> {
    this.logger.log('Herr');
    const code = await this.medicationsService.generateProductCode(10);

    return { code };
  }
}
