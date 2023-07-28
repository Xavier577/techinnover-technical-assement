import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import Swagger from '@common/utils/swagger';
import RequestLoggerMiddleware from '@common/middlewares/request-logger.middleware';
import { Logger } from '@nestjs/common';
import { DronesModule } from '@drones/drones.module';
import { MedicationsModule } from '@medications/medications.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get<string>('PORT');

  app.setGlobalPrefix('api');

  app.use(RequestLoggerMiddleware);

  Swagger(app, [DronesModule, MedicationsModule]);

  await app.listen(PORT);

  const appUrl = await app.getUrl();

  Logger.log(`app is running on ${appUrl}`, 'NestApplication');
}

bootstrap();
