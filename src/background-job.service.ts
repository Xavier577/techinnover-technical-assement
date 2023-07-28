import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DronesService } from '@drones/services/drones.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BackgroundJobService {
  private readonly logger = new Logger(BackgroundJobService.name);

  constructor(private readonly dronesService: DronesService) {}

  @Cron('* */15 * * * *')
  public async logDronesBatteryLevels(): Promise<void> {
    const drones = await this.dronesService.getAllDrones();

    const eventFilePath = path.join(
      __dirname,
      '..',
      'event-log',
      'battery-level.json',
    );

    const eventFile = fs.readFileSync(eventFilePath, { flag: 'a+' });

    let batteryEventLogJson = eventFile.toString();

    if ([null, undefined, ''].includes(batteryEventLogJson)) {
      batteryEventLogJson = '[]';
    }

    const batteryLevelEventLog = JSON.parse(batteryEventLogJson);

    for (const drone of drones) {
      this.logger.debug(
        `drone: ${drone.id} serialNumber: ${drone.serialNumber} batteryLevel: ${drone.batteryCapacity}`,
      );

      batteryLevelEventLog.push({
        id: drone.id,
        serialNumber: drone.serialNumber,
        batteryLevel: drone.batteryCapacity,
        timestamp: new Date(),
      });
    }

    fs.writeFileSync(eventFilePath, JSON.stringify(batteryLevelEventLog));
  }
}
