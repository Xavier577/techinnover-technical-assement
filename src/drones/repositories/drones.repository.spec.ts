import { Test, TestingModule } from '@nestjs/testing';
import { DronesRepositoryImpl as DronesRepository } from './drones.repository';
import { DatabaseModule } from '@database/database.module';

describe('DronesRepository', () => {
  let provider: DronesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [DronesRepository],
    }).compile();

    provider = module.get<DronesRepository>(DronesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
