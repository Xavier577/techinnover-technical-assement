import { Test, TestingModule } from '@nestjs/testing';
import { DronesService } from './drones.service';

describe('DronesService', () => {
  let service: DronesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DronesService],
    }).compile();

    service = module.get<DronesService>(DronesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
