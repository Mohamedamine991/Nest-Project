import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Question} from "./entities/question.entity";

@Injectable()
export class QuestionsService {
  constructor(
      @InjectRepository(Question)
      private questionRepository: Repository<Question>,
  ) {}
  create(Question: CreateQuestionDto) {
    const question = this.questionRepository.create(Question);
    return this.questionRepository.save(question);
  }

  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: number) {
    return this.questionRepository.findOneBy({
      id: id
    });
  }
  async getRightOption(id: number): Promise<number> {
    const question = await this.questionRepository.findOneBy({id : id});
    if (!question) {
      throw new Error('Question not found');
    }
    return question.correctOption;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    await this.questionRepository.update(id, updateQuestionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.questionRepository.delete(id);
  }
}
