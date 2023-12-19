import { Module } from '@nestjs/common';
import { TestQuizService } from './test-quiz.service';
import { TestQuizController } from './test-quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestQuiz } from './entities/test-quiz.entity';
import { Question } from '../questions/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestQuiz,Question])],
  controllers: [TestQuizController],

  providers: [TestQuizService],
})
export class TestQuizModule {}
