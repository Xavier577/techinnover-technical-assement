import { Test, TestingModule } from '@nestjs/testing';
import { DronesRepository } from './drones.repository';

describe('DronesRepository', () => {
  let provider: DronesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DronesRepository],
    }).compile();

    provider = module.get<DronesRepository>(DronesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
