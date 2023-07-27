import { Test, TestingModule } from '@nestjs/testing';
import { MedicationsService } from './medications.service';
import { MedicationsRepositoryProvider } from '../repositories/provider';

describe('MedicationsService', () => {
  let service: MedicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicationsService, MedicationsRepositoryProvider],
    }).compile();

    service = module.get<MedicationsService>(MedicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
