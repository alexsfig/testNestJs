import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';

describe('Cat Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CatController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CatController = module.get<CatController>(CatController);
    expect(controller).toBeDefined();
  });
});
