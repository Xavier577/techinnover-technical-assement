import { Test, TestingModule } from '@nestjs/testing';
import { MedicationsController } from './medications.controller';
import { MedicationsService } from './services/medications.service';
import { MedicationsRepositoryProvider } from './repositories/provider';

describe('MedicationsController', () => {
  let controller: MedicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationsController],
      providers: [MedicationsService, MedicationsRepositoryProvider],
    }).compile();

    controller = module.get<MedicationsController>(MedicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
