import { Injectable } from '@nestjs/common';

export interface MedicationsRepository {
  create(): Promise<void>;
}

@Injectable()
export class MedicationsRepositoryImpl implements MedicationsRepository {
  public async create(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
