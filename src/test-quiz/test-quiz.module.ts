import { Module } from '@nestjs/common';
import { TestQuizService } from './test-quiz.service';
import { TestQuizController } from './test-quiz.controller';

import { TestQuiz } from './entities/test-quiz.entity';
import { Question } from '../questions/entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TestQuiz,Question])],
  controllers: [TestQuizController],
  providers: [TestQuizService],
})
export class TestQuizModule {}