import { Injectable } from '@nestjs/common';
import { Medication } from '@medications/entities/medications.entity';
import { Prisma } from '@database/providers/prisma';

export type CreateMedicationArgs = Omit<Medication, 'id'>;
export type UpdateMedicationArgs = Partial<Omit<Medication, 'id' | 'code'>>;
export type LoadMedsOnDroneData = Omit<CreateMedicationArgs, 'droneId'>[];

export interface MedicationsRepository {
  create(data: CreateMedicationArgs): Promise<Medication>;

  findById(id: string): Promise<Medication>;

  findByCode(code: string): Promise<Medication>;

  findMedsLoadedOnDrone(droneId: string): Promise<Medication[]>;

  findMedWeightLoadedOnDrone(droneId: string): Promise<number>;

  loadMedsOnDrone(droneId: string, data: LoadMedsOnDroneData): Promise<void>;

  update(id: string, data: UpdateMedicationArgs): Promise<Medication>;
}

@Injectable()
export class MedicationsRepositoryImpl implements MedicationsRepository {
  constructor(private readonly prisma: Prisma) {}

  public async loadMedsOnDrone(
    droneId: string,
    data: LoadMedsOnDroneData,
  ): Promise<void> {
    await this.prisma.medication.createMany({
      data: data.map((d) => ({
        ...d,
        droneId: droneId,
      })),
    });
  }

  public async create(data: CreateMedicationArgs): Promise<Medication> {
    const medication = await this.prisma.medication.create({ data });

    return new Medication({
      id: medication.id,
      name: medication.name,
      code: medication.code,
      image: medication.image,
      weight: medication.weight.toNumber(),
      droneId: medication.droneId,
    });
  }
  public async findById(id: string): Promise<Medication> {
    const medication = await this.prisma.medication.findUnique({
      where: { id },
    });

    if (medication == null) return;

    return new Medication({
      id: medication.id,
      name: medication.name,
      code: medication.code,
      image: medication.image,
      weight: medication.weight.toNumber(),
      droneId: medication.droneId,
    });
  }

  public async findByCode(code: string): Promise<Medication> {
    const medication = await this.prisma.medication.findUnique({
      where: { code },
    });

    if (medication == null) return;

    return new Medication({
      id: medication.id,
      name: medication.name,
      code: medication.code,
      image: medication.image,
      weight: medication.weight.toNumber(),
      droneId: medication.droneId,
    });
  }

  public async findMedsLoadedOnDrone(droneId: string): Promise<Medication[]> {
    // use prisma extension to transform typeof weight from Decimal to JS Number while making query

    const xprisma = this.prisma.$extends({
      result: {
        medication: {
          weight: {
            needs: { weight: true },
            compute(med): number {
              return med.weight.toNumber();
            },
          },
        },
      },
    });

    return xprisma.medication.findMany({
      where: { droneId },
    });
  }

  public async findMedWeightLoadedOnDrone(droneId: string): Promise<number> {
    const p = await this.prisma.medication.aggregate({
      where: { droneId },
      _sum: {
        weight: true,
      },
    });

    return p?._sum?.weight?.toNumber?.();
  }

  public async update(
    id: string,
    data: UpdateMedicationArgs,
  ): Promise<Medication> {
    const updatedMedication = await this.prisma.medication.update({
      where: { id },
      data,
    });

    if (updatedMedication == null) return;

    return new Medication({
      id: updatedMedication.id,
      name: updatedMedication.name,
      code: updatedMedication.code,
      image: updatedMedication.image,
      weight: updatedMedication.weight.toNumber(),
      droneId: updatedMedication.droneId,
    });
  }
}
