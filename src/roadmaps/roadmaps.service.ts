// roadmap.service.ts

import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Roadmap } from './entities/roadmap.entity';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import {Milestone} from "../milestone/entities/milestone.entity";
import {User} from "../users/entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoadmapService {
  constructor(
      @InjectRepository(Roadmap)
      private roadmapRepository: Repository<Roadmap>,
      @InjectRepository(Milestone)
      private milestoneRepository:Repository<Milestone>,
      @InjectRepository(User)
    private userRepository:Repository<User>
  ) {}

  create(createRoadmapDto: CreateRoadmapDto): Promise<Roadmap> {
    const roadmap = this.roadmapRepository.create(createRoadmapDto);
    return this.roadmapRepository.save(roadmap);
  }
  // roadmap.service.ts

  async addUserToRoadmap(roadmapId: number, userId: number): Promise<Roadmap> {
    const roadmap = await this.roadmapRepository.findOne({
      where: { roadmapID: roadmapId },
      relations: ['users'],
    });

    if (!roadmap) {
      throw new NotFoundException(`Roadmap with ID #${roadmapId} not found`);
    }

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID #${userId} not found`);
    }

    // Check if the user is already added to the roadmap
    if (roadmap.users.find(u => u.id === user.id)) {
      throw new ConflictException(`User #${userId} is already added to roadmap`);
    }

    roadmap.users.push(user);
    return this.roadmapRepository.save(roadmap);
  }

  async assignMilestoneToRoadmap(roadmapID: number, milestoneID: number): Promise<Roadmap> {
    const roadmap = await this.roadmapRepository.findOne({
      where: { roadmapID },
      relations: ['milestones'],
    });

    if (!roadmap) {
      throw new NotFoundException(`Roadmap with ID #${roadmapID} not found`);
    }

    const milestone = await this.milestoneRepository.findOneBy({ milestoneId: milestoneID });

    if (!milestone) {
      throw new NotFoundException(`Milestone with ID #${milestoneID} not found`);
    }

    if (milestone.roadmap) {
      throw new BadRequestException(`Milestone with ID #${milestoneID} is already assigned to another roadmap`);
    }

    milestone.roadmap = roadmap;

    await this.milestoneRepository.save(milestone);

    return this.roadmapRepository.findOne({
      where: { roadmapID },
      relations: ['milestones'],
    });
  }
  async findOne(roadmapID: number): Promise<Roadmap> {
    const roadmap = await this.roadmapRepository.findOne({
      where: { roadmapID },
      relations: ['milestones', 'users'],
    });
    if (!roadmap) {
      throw new NotFoundException(`Roadmap with ID #${roadmapID} not found`);
    }
    return roadmap;
  }
/*
  async update(roadmapID: number, updateRoadmapDto: UpdateRoadmapDto): Promise<Roadmap> {
    const roadmap = await this.roadmapRepository.preload({
      roadmapID: roadmapID,
      ...updateRoadmapDto,
    });
    if (!roadmap) {
      throw new NotFoundException(`Roadmap with ID #${roadmapID} not found`);
    }
    return this.roadmapRepository.save(roadmap);
  }*/

  async remove(roadmapID: number): Promise<void> {
    const result = await this.roadmapRepository.delete(roadmapID);
    if (result.affected === 0) {
      throw new NotFoundException(`Roadmap with ID #${roadmapID} not found`);
    }
  }
}
