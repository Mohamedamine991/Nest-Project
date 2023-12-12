import { Module } from '@nestjs/common';
import { TestQuizService } from './test-quiz.service';
import { TestQuizController } from './test-quiz.controller';

@Module({
  controllers: [TestQuizController],
  providers: [TestQuizService],
})
export class TestQuizModule {}
