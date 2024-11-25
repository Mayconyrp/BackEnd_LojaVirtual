import { Test, TestingModule } from '@nestjs/testing';
import { MelhorEnvioController } from './melhor_envio.controller';
import { MelhorEnvioService } from './melhor_envio.service';

describe('MelhorEnvioController', () => {
  let controller: MelhorEnvioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MelhorEnvioController],
      providers: [MelhorEnvioService],
    }).compile();

    controller = module.get<MelhorEnvioController>(MelhorEnvioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
