import { Module } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { MilestoneController } from './milestone.controller';
import {Milestone} from "./entities/milestone.entity";

import {TestQuiz} from "../test-quiz/entities/test-quiz.entity";
import {Question} from "../questions/entities/question.entity";
import {Validation} from "../validations/entities/validation.entity";
import {User} from "../users/entities/user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Milestone,TestQuiz,Question,Validation,User])],
  controllers: [MilestoneController],
  providers: [MilestoneService],
})
export class MilestoneModule {}
