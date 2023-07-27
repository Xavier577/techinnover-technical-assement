import { Inject, Injectable } from '@nestjs/common';
import { MedicationsRepository } from '../repositories/medications.repository';
import { MEDICATIONS_REPOSITORY_PROVIDER } from '../repositories/provider';

@Injectable()
export class MedicationsService {
  constructor(
    @Inject(MEDICATIONS_REPOSITORY_PROVIDER)
    private readonly medicationsRepository: MedicationsRepository,
  ) {}
}
