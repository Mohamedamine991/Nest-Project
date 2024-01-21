import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateValidationDto } from './dto/create-validation.dto';
import { UpdateValidationDto } from './dto/update-validation.dto';
import {Validation} from "./entities/validation.entity";
import {FindOneOptions, IntegerType, Repository} from "typeorm";
import {MilestoneService} from "../milestone/milestone.service";
import {UsersService} from "../users/users.service";
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../common/crud.service';
import { boolean } from 'joi';
import { ConfirmValidationDto } from './dto/confirm-validation.dto';
import { TestQuiz } from '../test-quiz/entities/test-quiz.entity';
import User from '../users/entities/user.entity';
import { Milestone } from '../milestone/entities/milestone.entity';
import { Question } from '../questions/entities/question.entity';
import { title } from 'process';
import test from 'node:test';
// validations.service.ts


@Injectable()
export class ValidationsService extends CrudService<Validation> {
  constructor(
    @InjectRepository(Validation)
    private validationRepository: Repository<Validation>,
    @InjectRepository(Milestone)
    private milestoneRepository:Repository<Milestone>,
    @InjectRepository(User)
    private userRepository:Repository<User>,
    @InjectRepository(TestQuiz)
    private testRepository:Repository<TestQuiz>,
    @InjectRepository(Question)
    private questionRepository:Repository<Question>
  ) {
    super(validationRepository);
  }

  async createValidation(createDto: CreateValidationDto): Promise<Validation> {
    const { userId, milestoneId, passed, score } = createDto;
    const user = await this.userRepository.findOne({where : {id:userId}});
    const milestone = await this.milestoneRepository.findOne({where: {id:milestoneId}});
    if (!user || !milestone) {
      throw new NotFoundException('User or Milestone not found.');
    }
    const newValidation = this.validationRepository.create({
      user,
      milestone,
      passed,
      score,
    });
    return this.validationRepository.save(newValidation);
  }

  async updateValidationByUserAndMilestone(userId: number, milestoneId: string, updateDto: UpdateValidationDto): Promise<Validation> {
    const { passed, score } = updateDto;
    const findOneOptions: FindOneOptions<Validation> = {
      where: { user: { id: userId }, milestone: { id: milestoneId } },
    };
    const existingValidation = await this.validationRepository.findOne(findOneOptions);

    if (!existingValidation) {
      throw new NotFoundException(`Validation for User ID ${userId} and Milestone ID ${milestoneId} not found.`);
    }
    if (passed !== undefined) {
      existingValidation.passed = passed;
    }

    if (score !== undefined) {
      existingValidation.score = score;
    }
    return this.validationRepository.save(existingValidation);
  }

  async calculateAndUpdateScore(confirmvalidationdto:ConfirmValidationDto): Promise<any> {
    const {userId,milestoneId,userAnswers}=confirmvalidationdto
    const user = await this.userRepository.findOne({where : {id:userId}});
    const milestone = await this.milestoneRepository.findOne({where: {id:milestoneId}})
    const testQuiz =await this.testRepository.findOne({where :{title:milestone.id}})
    const questions =await this.questionRepository.find({
      where: {testQuiz:{ title:testQuiz.title}}
    })
    if (!user || !milestone) {
      throw new NotFoundException('User or Milestone not found.');
    }
    console.log('output')
    console.log(questions)
    let cout=0
    let len=0
    for ( const question of questions){
      console.log(question.correctOption)
      console.log(userAnswers[0])
      console.log(userAnswers)
      if (question.correctOption === userAnswers[len]) {
        cout=cout+1
      }
      len=len+1
    }
    const userScore = ((cout / len) * 100);
    const score= parseFloat(userScore.toString())
    const validation = await this.validationRepository.findOne({
      where: { user, milestone },
    });
    const threshold = 70;
    const passed=userScore >= threshold;
    console.log(userScore)
    console.log(typeof(userScore))
    if (!validation) {
      const createValidationDto = {
        userId: user.id,
        milestoneId: milestone.id,
        passed: passed,
        score: score,
      };
      return await this.validationRepository.save(createValidationDto)
    }
    validation.score = score;
    validation.passed = passed;
    return await this.validationRepository.save(validation);
    
  }

}
