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
// validations.service.ts


@Injectable()
export class ValidationsService extends CrudService<Validation> {
  constructor(
    @InjectRepository(Validation)
    private validationRepository: Repository<Validation>,
    private milestoneService: MilestoneService,
    private userService: UsersService,
    // Other repositories as needed
  ) {
    super(validationRepository);
  }

  async createValidation(createDto: CreateValidationDto): Promise<Validation> {
    const { userId, milestoneId, passed, score } = createDto;
    const user = await this.userService.findOne(userId);
    const milestone = await this.milestoneService.findOne(milestoneId);
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
    const user = await this.userService.findOne(userId);
    const milestone = await this.milestoneService.findOne(milestoneId);
    if (!user || !milestone) {
      throw new NotFoundException('User or Milestone not found.');
    }
    console.log('output')
    console.log(milestone.quiz)
    /*
    const correctAnswers = questions.reduce((count, question) => {
      if (question.correctOption === userAnswers[question.questionID]) {
        return count + 1;
      }
      return count;
    }, 0);
    const totalQuestions = questions.length;
    const userScore = (correctAnswers / totalQuestions) * 100;
    const validation = await this.validationRepository.findOne({
      where: { user, milestone },
    });
    const threshold = 70;
    const passed=userScore >= threshold;
    if (!validation) {
      const createValidationDto = {
        userId: user.id,
        milestoneId: milestone.id,
        passed: passed,
        score: userScore,
      };
      this.createValidation(createValidationDto)
    }
    validation.score = userScore;
    validation.passed = passed;
    return await this.validationRepository.save(validation);
    */
  }

}
