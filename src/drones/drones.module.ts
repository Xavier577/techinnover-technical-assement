import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { MedicationsModule } from '@medications/medications.module';
import { DronesService } from './services/drones.service';
import { DronesController } from './drones.controller';
import { DronesRepositoryProvider } from '@drones/repositories/provider';

@Module({
  imports: [DatabaseModule, MedicationsModule],
  controllers: [DronesController],
  providers: [DronesService, DronesRepositoryProvider],
})
export class DronesModule {}
