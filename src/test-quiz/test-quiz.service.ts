import { Injectable } from '@nestjs/common';
import { CreateTestQuizDto } from './dto/create-test-quiz.dto';
import { UpdateTestQuizDto } from './dto/update-test-quiz.dto';

@Injectable()
export class TestQuizService {
  create(createTestQuizDto: CreateTestQuizDto) {
    return 'This action adds a new testQuiz';
  }

  findAll() {
    return `This action returns all testQuiz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testQuiz`;
  }

  update(id: number, updateTestQuizDto: UpdateTestQuizDto) {
    return `This action updates a #${id} testQuiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} testQuiz`;
  }
}
