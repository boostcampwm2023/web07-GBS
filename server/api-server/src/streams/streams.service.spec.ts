import { Test, TestingModule } from '@nestjs/testing';
import { StreamsService } from './streams.service';

describe('StreamsService', () => {
  let service: StreamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreamsService],
    }).compile();

    service = module.get<StreamsService>(StreamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
