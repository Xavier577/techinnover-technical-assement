import {
  PrismaClient,
  Drone,
  DroneModel,
  DroneState,
  Medication,
  Prisma as P,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

function mockDrones(numberOfDrones = 1): Drone[] {
  return Array(numberOfDrones)
    .fill(null)
    .map(() => ({
      id: faker.string.uuid(),
      serialNumber: faker.string.uuid(),
      model: faker.helpers.enumValue(DroneModel),
      batteryCapacity: faker.number.int({ min: 0, max: 100 }),
      state: faker.helpers.enumValue(DroneState),
      weightLimit: new P.Decimal(faker.number.int({ min: 0, max: 500 })),
    }));
}

function mockMedications(
  numberOfMedications = 1,
): Omit<Medication, 'droneId'>[] {
  return Array(numberOfMedications)
    .fill(null)
    .map(() => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      weight: new P.Decimal(faker.number.float({ min: 0, max: 500 })),
      code: faker.helpers.fromRegExp(/[A-Z]{2}[_A-Z0-9]{8}/),
      image: faker.image.url(),
    }));
}

async function main(): Promise<void> {
  const mockedDrones = mockDrones(20);

  const drones = await prisma.drone.createMany({ data: mockedDrones });

  console.log({ drones });

  const meds = await prisma.medication.createMany({
    data: mockMedications(100).map((med, idx) => ({
      ...med,
      droneId: mockedDrones[idx % 20].id,
    })),
  });

  console.log({ meds });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
