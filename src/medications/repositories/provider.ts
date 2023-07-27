import { Provider } from '@nestjs/common';
import { MedicationsRepositoryImpl } from './medications.repository';

export const MEDICATIONS_REPOSITORY_PROVIDER = Symbol('MedicationsRepository');

export const MedicationsRepositoryProvider: Provider = {
  provide: MEDICATIONS_REPOSITORY_PROVIDER,
  useClass: MedicationsRepositoryImpl,
};
