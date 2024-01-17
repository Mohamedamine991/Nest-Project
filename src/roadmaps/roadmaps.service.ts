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

  async addUserToRoadmap(roadmapId:string, userId: number): Promise<Roadmap> {
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

   
    if (roadmap.users.find(u => u.id === user.id)) {
      throw new ConflictException(`User #${userId} is already added to roadmap`);
    }

    roadmap.users.push(user);
    return this.roadmapRepository.save(roadmap);
  }

  async assignMilestoneToRoadmap(roadmapID:string, milestoneID: string): Promise<Roadmap> {
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
  async findOne(roadmapID: string): Promise<Roadmap> {
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

  async remove(roadmapID: string): Promise<void> {
    const result = await this.roadmapRepository.delete(roadmapID);
    if (result.affected === 0) {
      throw new NotFoundException(`Roadmap with ID #${roadmapID} not found`);
    }
  }
  //seed database
  async seedRoadmaps() {
    const roadmapsData: CreateRoadmapDto[] = [
      {
        "roadmapID": "DevOps",
        "title": "DevOps",
        "domain": "Software Development",
        "description": "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the development lifecycle and deliver high-quality software continuously. This roadmap includes key milestones such as mastering Linux, containerization with Docker, Infrastructure as Code (IaC) with Terraform, Continuous Integration/Continuous Deployment (CI/CD), and orchestration with Kubernetes."
    },
    {
        "roadmapID": "FullStackWebDev",
        "title": "Full Stack Web Development with Nest and Angular",
        "domain": "Web Development",
        "description": "This roadmap covers the full stack web development process, incorporating both frontend and backend technologies. It includes learning the essentials of web development, backend development with Node.js and Nest framework, database design, frontend development with Angular, and the development and integration of RESTful APIs for seamless communication between frontend and backend components."
    },
    {
        "roadmapID": "Cybersecurity",
        "title": "Cybersecurity",
        "domain": "Information Security",
        "description": "Cybersecurity involves the practice of protecting systems, networks, and programs from digital attacks, damage, or unauthorized access. It encompasses various technologies, processes, and practices designed to safeguard information and ensure the confidentiality, integrity, and availability of data."
    },
    {
        "roadmapID": "MachineLearning",
        "title": "Machine Learning",
        "domain": "Computer Science",
        "description": "Machine learning (ML) is the study of computer algorithms that improve automatically through experience. It is seen as a subset of artificial intelligence. Machine learning algorithms build a mathematical model based on sample data, known as training data, in order to make predictions or decisions without being explicitly programmed to do so."
    }        
    ];

    const roadmaps: Roadmap[] = [];

    for (const roadmapData of roadmapsData) {
      const roadmap = this.roadmapRepository.create(roadmapData);
      roadmaps.push(roadmap);
    }
    await this.roadmapRepository.save(roadmaps);
  }

}
