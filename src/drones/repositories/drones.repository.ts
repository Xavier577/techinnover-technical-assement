import { Injectable } from '@nestjs/common';
import { Drone } from '@drones/entities/drone.entity';
import { Prisma } from '@database/providers/prisma';
import { DroneState } from '@common/enums';

export type CreateDroneArgs = Omit<Drone, 'id' | 'serialNumber'>;
export type UpdateDroneArgs = Pick<Drone, 'state'>;

export interface DronesRepository {
  create(data: CreateDroneArgs): Promise<Drone>;

  findById(id: string): Promise<Drone>;

  findBySerialNumber(serialNumber: string): Promise<Drone>;

  findAvailable(): Promise<Drone[]>;

  findAll(): Promise<Drone[]>;

  findBatteryCapacity(id: string): Promise<number>;

  findState(id: string): Promise<DroneState>;

  update(id: string, args: UpdateDroneArgs): Promise<Drone>;

  delete(id: string): Promise<Drone>;
}

@Injectable()
export class DronesRepositoryImpl implements DronesRepository {
  constructor(private readonly prisma: Prisma) {}

  public async create(data: CreateDroneArgs): Promise<Drone> {
    const drone = await this.prisma.drone.create({ data });

    return new Drone({
      id: drone.id,
      serialNumber: drone.serialNumber,
      model: drone.model,
      batteryCapacity: drone.batteryCapacity,
      weightLimit: drone.weightLimit.toNumber(),
      state: drone.state,
    });
  }

  public async findById(id: string): Promise<Drone> {
    const drone = await this.prisma.drone.findUnique({ where: { id } });

    if (drone == null) return;

    return new Drone({
      id: drone.id,
      serialNumber: drone.serialNumber,
      model: drone.model,
      batteryCapacity: drone.batteryCapacity,
      weightLimit: drone.weightLimit.toNumber(),
      state: drone.state,
    });
  }

  public async findBySerialNumber(serialNumber: string): Promise<Drone> {
    const drone = await this.prisma.drone.findUnique({
      where: { serialNumber },
    });

    if (drone == null) return;

    return new Drone({
      id: drone.id,
      serialNumber: drone.serialNumber,
      model: drone.model,
      batteryCapacity: drone.batteryCapacity,
      weightLimit: drone.weightLimit.toNumber(),
      state: drone.state,
    });
  }

  public async findAvailable(): Promise<Drone[]> {
    const xprisma = this.prisma.$extends({
      result: {
        drone: {
          weightLimit: {
            needs: { weightLimit: true },
            compute(drone): number {
              return drone.weightLimit.toNumber();
            },
          },
        },
      },
    });

    return xprisma.drone.findMany({
      where: {
        batteryCapacity: {
          gt: 25,
        },
        OR: [{ state: DroneState.IDLE }, { state: DroneState.LOADING }],
      },
    });
  }

  /** Avoid using this method as much as possible because it performs a full table scan*/
  public async findAll(): Promise<Drone[]> {
    const xprisma = this.prisma.$extends({
      result: {
        drone: {
          weightLimit: {
            needs: { weightLimit: true },
            compute(drone): number {
              return drone.weightLimit.toNumber();
            },
          },
        },
      },
    });

    return xprisma.drone.findMany();
  }

  public async findBatteryCapacity(id: string): Promise<number> {
    const result = await this.prisma.drone.findUnique({
      where: { id },
      select: { batteryCapacity: true },
    });

    return result?.batteryCapacity;
  }

  public async findState(id: string): Promise<DroneState> {
    const result = await this.prisma.drone.findUnique({
      where: { id },
      select: { state: true },
    });

    if (result == null) return;

    return result.state;
  }

  public async update(id: string, data: UpdateDroneArgs): Promise<Drone> {
    const updatedDrone = await this.prisma.drone.update({
      where: { id },
      data: { state: data.state },
    });

    if (updatedDrone == null) return;

    return new Drone({
      id: updatedDrone.id,
      serialNumber: updatedDrone.serialNumber,
      model: updatedDrone.model,
      batteryCapacity: updatedDrone.batteryCapacity,
      weightLimit: updatedDrone.weightLimit.toNumber(),
      state: updatedDrone.state,
    });
  }

  public async delete(id: string): Promise<Drone> {
    const deletedDrone = await this.prisma.drone.delete({ where: { id } });

    if (deletedDrone == null) return;

    return new Drone({
      id: deletedDrone.id,
      serialNumber: deletedDrone.serialNumber,
      model: deletedDrone.model,
      batteryCapacity: deletedDrone.batteryCapacity,
      weightLimit: deletedDrone.weightLimit.toNumber(),
      state: deletedDrone.state,
    });
  }
}
