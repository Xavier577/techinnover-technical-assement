import { Controller } from '@nestjs/common';
import { MedicationsService } from './services/medications.service';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}
}
