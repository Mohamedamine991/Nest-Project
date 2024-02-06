import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestQuiz } from '../test-quiz/entities/test-quiz.entity';
import { JwtService } from '@nestjs/jwt';
import { ValidationsService } from '../validations/validations.service';
import { Validation } from '../validations/entities/validation.entity';
import User from '../users/entities/user.entity';
import { Milestone } from '../milestone/entities/milestone.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Question,TestQuiz,Validation,User,Milestone])],
  controllers: [QuestionsController],
  providers: [QuestionsService,JwtService,ValidationsService],
})
export class QuestionsModule {}