import { Test, TestingModule } from '@nestjs/testing';
import { TestQuizService } from './test-quiz.service';

describe('TestQuizService', () => {
  let service: TestQuizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestQuizService],
    }).compile();

    service = module.get<TestQuizService>(TestQuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
