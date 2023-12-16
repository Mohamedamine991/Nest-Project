import { Injectable } from '@nestjs/common';
import { CreateValidationDto } from './dto/create-validation.dto';
import { UpdateValidationDto } from './dto/update-validation.dto';

@Injectable()
export class ValidationsService {
  create(createValidationDto: CreateValidationDto) {
    return 'This action adds a new validation';
  }

  findAll() {
    return `This action returns all validations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} validation`;
  }

  update(id: number, updateValidationDto: UpdateValidationDto) {
    return `This action updates a #${id} validation`;
  }

  remove(id: number) {
    return `This action removes a #${id} validation`;
  }
}
