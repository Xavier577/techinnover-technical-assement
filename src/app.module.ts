import { Module, ValidationPipe } from '@nestjs/common';
import { DronesModule } from '@drones/drones.module';
import { MedicationsModule } from '@medications/medications.module';
import { DatabaseModule } from '@database/database.module';
import { ConfigModule } from '@nestjs/config';
import envValidator from '@common/validators/env.validator';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ErrorInterceptor } from '@common/interceptors/error.interceptor';
import { ResponseLoggerInterceptor } from '@common/interceptors/response-logger.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema: envValidator }),
    DatabaseModule,
    DronesModule,
    MedicationsModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseLoggerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ErrorInterceptor },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        errorHttpStatusCode: 400,
        stopAtFirstError: true,
      }),
    },
  ],
})
export class AppModule {}
