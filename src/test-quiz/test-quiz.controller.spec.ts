import { Test, TestingModule } from '@nestjs/testing';
import { TestQuizController } from './test-quiz.controller';
import { TestQuizService } from './test-quiz.service';

describe('TestQuizController', () => {
  let controller: TestQuizController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestQuizController],
      providers: [TestQuizService],
    }).compile();

    controller = module.get<TestQuizController>(TestQuizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
