// progress.service.ts
import {ConflictException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import { Progress } from './entities/progress.entity';
import { CreateProgressDto } from './dto/create-progress.dto';
import {Milestone} from "../milestone/entities/milestone.entity";
import {Validation} from "../validations/entities/validation.entity";
import {UsersService} from "../users/users.service";
@Injectable()
export class ProgressService {
  constructor(
      @InjectRepository(Progress)
      private progressRepository: Repository<Progress>,
      @InjectRepository(Milestone)
      private milestoneRepository: Repository<Milestone>,
      @InjectRepository(Validation)
      private validationRepository: Repository<Validation>,
  ) {}
  async calculateUserProgressForRoadmap(userId: number, roadmapId: number): Promise<number> {
    // Retrieve all milestones for the specified roadmap
    const milestones = await this.milestoneRepository.find({
      where: { roadmap: { roadmapID: roadmapId } },
    });

    // Retrieve all validation records for the user for each milestone
    const validations = await this.validationRepository.find({
      where: { user: { id: userId }, milestone: In(milestones.map(milestone => milestone.milestoneId)) },
    });

    const userTotalScore = validations.reduce((total, validation) => {
      return validation.passed ? total + validation.score : total;
    }, 0);

    const maxPossibleScore = milestones.reduce((total, milestone) => total + milestone.score, 0);

    const progressPercentage = (userTotalScore / maxPossibleScore) * 100;

    let progressRecord = await this.progressRepository.findOne({
      where: { user: { id: userId }, roadmap: { roadmapID: roadmapId } },
    });

    if (progressRecord) {
      // Update the existing progress record
      progressRecord.percentage = progressPercentage;
    } else {
      // Create a new progress record
      progressRecord = this.progressRepository.create({
        user: { id: userId } as any,
        roadmap: { id: roadmapId } as any,
        percentage: progressPercentage,
      });
    }

    // Save the updated or new progress record
    await this.progressRepository.save(progressRecord);

    return progressPercentage;
  }
  async create(createProgressDto: CreateProgressDto): Promise<Progress> {
    const progress = this.progressRepository.create({
      user: { id: createProgressDto.userId } as any,
      roadmap: { id: createProgressDto.roadmapId } as any,
      percentage: createProgressDto.percentage,
    });
    return this.progressRepository.save(progress);
  }

  async subscribeUserToRoadmap(userId: number, roadmapId: number): Promise<Progress> {
    const existingProgress = await this.progressRepository.findOne({
      where: {
        user: { id: userId },
        roadmap : {roadmapID: roadmapId}

      },
    });

    if (existingProgress) {
      throw new ConflictException('User is already subscribed to this roadmap');
    }

     const progress= this.progressRepository.create({
       user: { id: userId },
       roadmap : {roadmapID: roadmapId},
      percentage: 0 ,
    });

    return this.progressRepository.save(progress);
  }


  async findAll(): Promise<Progress[]> {
    return this.progressRepository.find({ relations: ['user', 'roadmap'] });
  }

  async findOne(id: number): Promise<Progress> {
    return this.progressRepository.findOneBy({progressID :id});
  }

  /*async update(id: number, updateProgressDto: UpdateProgressDto): Promise<Progress> {
    const progress = await this.findOne(id);
    if (!progress) {
      throw new Error(`Progress with ID ${id} not found`);
    }

    // Update only provided fields
    if (updateProgressDto.userId) {
      progress.user = { id: updateProgressDto.userId } as any;
    }
    if (updateProgressDto.roadmapId) {
      progress.roadmap = { id: updateProgressDto.roadmapId } as any;
    }
    if (updateProgressDto.percentage !== undefined) {
      progress.percentage = updateProgressDto.percentage;
    }

    return this.progressRepository.save(progress);
  }
*/
  async remove(id: number): Promise<void> {
    await this.progressRepository.delete(id);
  }

}
