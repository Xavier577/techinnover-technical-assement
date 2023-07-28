import { Inject, Injectable } from '@nestjs/common';
import {
  CreateMedicationArgs,
  LoadMedsOnDroneData,
  MedicationsRepository,
} from '../repositories/medications.repository';
import { MEDICATIONS_REPOSITORY_PROVIDER } from '../repositories/provider';
import { Medication } from '@medications/entities/medications.entity';

@Injectable()
export class MedicationsService {
  constructor(
    @Inject(MEDICATIONS_REPOSITORY_PROVIDER)
    private readonly medicationsRepository: MedicationsRepository,
  ) {}

  public async create(data: CreateMedicationArgs): Promise<Medication> {
    return this.medicationsRepository.create(data);
  }

  public async getById(id: string): Promise<Medication> {
    return this.medicationsRepository.findById(id);
  }

  public async getByCode(code: string): Promise<Medication> {
    return this.medicationsRepository.findByCode(code);
  }

  public async loadMedsOnDrone(
    droneId: string,
    data: LoadMedsOnDroneData,
  ): Promise<void> {
    return this.medicationsRepository.loadMedsOnDrone(droneId, data);
  }

  public async getMedWeightLoadedOnDrone(droneId: string): Promise<number> {
    return this.medicationsRepository.findMedWeightLoadedOnDrone(droneId);
  }

  public getMedsLoadOnDrone(droneId: string): Promise<Medication[]> {
    return this.medicationsRepository.findMedsLoadedOnDrone(droneId);
  }

  public async generateProductCode(length = 10): Promise<string> {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const DIGITS = '1234567890';
    const ALLOWED_CHAR = [...ALPHABET.split(''), ...DIGITS.split(''), '_'];

    const charArr: string[] = [];

    for (let i = 0; i < length + 1; i++) {
      const randIdx = Math.ceil(Math.random() * (ALLOWED_CHAR.length - 1));

      charArr[i] = ALLOWED_CHAR[randIdx];
    }

    const productCode = charArr.join('');

    const medWithProductCode = await this.medicationsRepository.findByCode(
      productCode,
    );

    if (medWithProductCode != null) {
      return this.generateProductCode(length);
    }

    return productCode;
  }
}
