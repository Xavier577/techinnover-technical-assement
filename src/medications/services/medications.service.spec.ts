import { Test, TestingModule } from '@nestjs/testing';
import { MedicationsServiceImpl } from './medications.service';
import { MedicationsRepositoryProvider } from '../repositories/provider';

describe('MedicationsService', () => {
  let service: MedicationsServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicationsServiceImpl, MedicationsRepositoryProvider],
    }).compile();

    service = module.get<MedicationsServiceImpl>(MedicationsServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
