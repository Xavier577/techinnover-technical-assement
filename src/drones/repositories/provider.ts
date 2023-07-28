import { Provider } from '@nestjs/common';
import { DronesRepositoryImpl } from '@drones/repositories/drones.repository';

export const DRONES_REPOSITORY_PROVIDER = Symbol('DronesRepository');

export const DronesRepositoryProvider: Provider = {
  provide: DRONES_REPOSITORY_PROVIDER,
  useClass: DronesRepositoryImpl,
};
