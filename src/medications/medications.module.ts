import { Module } from '@nestjs/common';
import { MedicationsService } from './services/medications.service';
import { MedicationsController } from './medications.controller';
import { MedicationsRepositoryProvider } from './repositories/provider';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MedicationsController],
  providers: [MedicationsService, MedicationsRepositoryProvider],
  exports: [MedicationsService],
})
export class MedicationsModule {}
