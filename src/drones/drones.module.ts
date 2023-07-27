import { Module } from '@nestjs/common';
import { DronesService } from './services/drones.service';
import { DronesController } from './drones.controller';
import { DronesRepository } from './repositories/drones.repository';
import { MedicationsModule } from '@medications/medications.module';

@Module({
  imports: [MedicationsModule],
  controllers: [DronesController],
  providers: [DronesService, DronesRepository],
})
export class DronesModule {}
