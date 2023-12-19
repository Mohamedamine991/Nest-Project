import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateValidationDto } from './dto/create-validation.dto';
import { UpdateValidationDto } from './dto/update-validation.dto';
import {Validation} from "./entities/validation.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {MilestoneService} from "../milestone/milestone.service";
import {UsersService} from "../users/users.service";

@Injectable()
export class ValidationsService {
  constructor(
      @InjectRepository(Validation)
      private validationRepository: Repository<Validation>,
      private milestoneService: MilestoneService,
      private userService: UsersService,
      // Other repositories as needed
  ) {}
  async createValidation(createValidationDto: CreateValidationDto): Promise<Validation> {
    const validation = this.validationRepository.create(createValidationDto);
    return this.validationRepository.save(validation);
  }
  async updateValidation(id: number, value  :number): Promise<Validation> {
    const validation = await this.validationRepository.findOne({
      where: {
        validationId: id
      },
    });

    if (!validation) {
      throw new Error('Validation record not found');
    }
    validation.score +=value;
    validation.passed = validation.score === 100;

    return this.validationRepository.save(validation);

  }


  async addValidation(userId: number, milestoneId: number): Promise<Validation> {
    const existingValidation = await this.validationRepository.findOne({
      where: { user: { id: userId }, milestone: { milestoneId: milestoneId } },
    });

    if (existingValidation) {
      throw new ConflictException('Validation already exists for this user and milestone');
    }

    const validation = this.validationRepository.create({
    user :{ id: userId }, milestone: { milestoneId: milestoneId }

    });


    await this.validationRepository.save(validation);

    await this.milestoneService.addUserToMilestone(milestoneId, userId);
    await this.userService.addMilestoneToUser(userId, milestoneId);

    return validation;
  }




  async findAll(): Promise<Validation[]> {
    return this.validationRepository.find(); // Retrieves all validation records
  }

  async findOne(id: number): Promise<Validation> {
    const validation = await this.validationRepository.findOneBy({ validationId: id });

    if (!validation) {
      throw new NotFoundException(`Validation with ID #${id} not found`);
    }

    return validation;
  }

  async remove(id: number): Promise<void> {
    const result = await this.validationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Validation with ID #${id} not found`);
    }

    return;
  }
}
