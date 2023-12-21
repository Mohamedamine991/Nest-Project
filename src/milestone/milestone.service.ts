import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import {Repository} from "typeorm";
import {Milestone} from "./entities/milestone.entity";

import {TestQuiz} from "../test-quiz/entities/test-quiz.entity";
import {User} from "../users/entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MilestoneService {
  constructor(
      @InjectRepository(Milestone)
      private milestoneRepository: Repository<Milestone>,
      @InjectRepository(TestQuiz)
      private testQuizRepository: Repository<TestQuiz>,
      @InjectRepository(User)
      private userRepository : Repository<User>
  ) {}
  create(createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
    const milestone = this.milestoneRepository.create(createMilestoneDto);
    return this.milestoneRepository.save(milestone);
  }
  findAll() {
    return this.milestoneRepository.find({
      relations: ['roadmap', 'users', 'recommandedCertifications', 'recommandedCourses', 'quiz'],
    });
  }
  // milestone.service.ts

  async addUserToMilestone(milestoneId: number, userId: number): Promise<Milestone> {
    const milestone = await this.milestoneRepository.findOne({
      where: { milestoneId: milestoneId },
      relations: ['users'],
    });

    if (!milestone) {
      throw new NotFoundException(`Milestone with ID #${milestoneId} not found`);
    }

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID #${userId} not found`);
    }

    if (milestone.users.some(u => u.id === user.id)) {
      throw new ConflictException(`Milestone already has user with ID #${userId}`);
    }

    milestone.users.push(user);
    return this.milestoneRepository.save(milestone);
  }



  findOne(id: number) {
    return this.milestoneRepository.findOne({
      where: { milestoneId : id },
      relations: ['roadmap', 'users', 'recommandedCertifications', 'recommandedCourses', 'quiz'],
    });
  }

  async assignQuizToMilestone(milestoneId: number, testQuizId: number): Promise<Milestone> {
    const milestone = await this.milestoneRepository.findOneBy({ milestoneId: milestoneId });
    if (!milestone) {
      throw new NotFoundException(`Milestone avec ID #${milestoneId} non trouvée`);
    }

    const testQuiz = await this.testQuizRepository.findOneBy({ quizID: testQuizId });
    if (!testQuiz) {
      throw new NotFoundException(`TestQuiz avec ID #${testQuizId} non trouvé`);
    }

    milestone.quiz = testQuiz;

    return this.milestoneRepository.save(milestone);
  }




  async remove(id: number) {
    await this.milestoneRepository.delete(id);
  }
}
