import { Test, TestingModule } from '@nestjs/testing';
import { MedicationsRepositoryImpl as MedicationsRepository } from './medications.repository';

describe('MedicationsRepositories', () => {
  let provider: MedicationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicationsRepository],
    }).compile();

    provider = module.get<MedicationsRepository>(MedicationsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
