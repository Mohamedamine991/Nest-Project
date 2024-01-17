import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestQuiz } from '../test-quiz/entities/test-quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question,TestQuiz])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}