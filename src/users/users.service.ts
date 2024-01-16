import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Roadmap} from "../roadmaps/entities/roadmap.entity";
import {Milestone} from "../milestone/entities/milestone.entity";

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      @InjectRepository(Roadmap)
      private roadmapRepository: Repository<Roadmap>,
      @InjectRepository(Milestone)
      private milestoneRepository : Repository<Milestone>
  ) {}
  async getUserSubscribedRoadmaps(userId: number): Promise<Roadmap[]> {
    const userWithRoadmaps = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roadmaps'], // Assuming 'roadmaps' is the correct relation name
    });

    if (!userWithRoadmaps) {
      throw new NotFoundException('User not found');
    }

    return userWithRoadmaps.roadmaps;
  }

  // users.service.ts

  async addMilestoneToUser(userId: number, milestoneId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['milestones'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID #${userId} not found`);
    }

    const milestone = await this.milestoneRepository.findOneBy({ milestoneId: milestoneId });

    if (!milestone) {
      throw new NotFoundException(`Milestone with ID #${milestoneId} not found`);
    }

    if (user.milestones.some(m => m.milestoneId === milestone.milestoneId)) {
      throw new ConflictException(`User already has milestone with ID #${milestoneId}`);
    }

    user.milestones.push(milestone);
    return this.userRepository.save(user);
  }

  async getUserMilestonesInRoadmap(userId: number, roadmapId: string): Promise<Milestone[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['milestones'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID #${userId} not found`);
    }



    const filteredMilestones = user.milestones.filter(milestone => milestone.roadmap.roadmapID === roadmapId);

    return filteredMilestones;
  }


  async addRoadmap(userId: number, roadmapId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roadmaps'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID #${userId} not found`);
    }

    const roadmap = await this.roadmapRepository.findOneBy({ roadmapID: roadmapId });

    if (!roadmap) {
      throw new NotFoundException(`Roadmap with ID #${roadmapId} not found`);
    }

    // Check if the user is already subscribed to the roadmap
    if (user.roadmaps.find(rm => rm.roadmapID === roadmap.roadmapID)) {
      throw new ConflictException(`User already subscribed to roadmap #${roadmapId}`);
    }

    user.roadmaps.push(roadmap);
    return this.userRepository.save(user);
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id: id});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }



}