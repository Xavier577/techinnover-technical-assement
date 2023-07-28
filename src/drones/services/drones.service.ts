import { Inject, Injectable } from '@nestjs/common';
import {
  CreateDroneArgs,
  DronesRepository,
} from '@drones/repositories/drones.repository';
import { DRONES_REPOSITORY_PROVIDER } from '@drones/repositories/provider';
import { Drone } from '@drones/entities/drone.entity';
import { DroneState } from '@common/enums';

@Injectable()
export class DronesService {
  constructor(
    @Inject(DRONES_REPOSITORY_PROVIDER)
    private readonly dronesRepository: DronesRepository,
  ) {}

  public async createDrone(data: CreateDroneArgs): Promise<Drone> {
    return this.dronesRepository.create(data);
  }

  public async getDroneById(id: string): Promise<Drone> {
    return this.dronesRepository.findById(id);
  }

  public async getDroneBySerialNumber(serialNumber: string): Promise<Drone> {
    return this.dronesRepository.findBySerialNumber(serialNumber);
  }

  public async getAllDrones(): Promise<Drone[]> {
    return this.dronesRepository.findAll();
  }

  public async getAvailableDrones(): Promise<Drone[]> {
    return this.dronesRepository.findAvailable();
  }

  public async getDroneBatteryCapacity(id: string): Promise<number> {
    return this.dronesRepository.findBatteryCapacity(id);
  }

  public async getDroneState(id: string): Promise<DroneState> {
    return this.dronesRepository.findState(id);
  }
}
