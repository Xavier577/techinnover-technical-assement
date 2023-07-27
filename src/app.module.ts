import { Module } from '@nestjs/common';
import { DronesModule } from '@drones/drones.module';
import { MedicationsModule } from '@medications/medications.module';
import { DatabaseModule } from '@database/database.module';
import { ConfigModule } from '@nestjs/config';
import envValidator from '@common/validators/env.validator';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema: envValidator }),
    DatabaseModule,
    DronesModule,
    MedicationsModule,
  ],
})
export class AppModule {}
