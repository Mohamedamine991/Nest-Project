import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateTestQuizDto } from './dto/create-test-quiz.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {TestQuiz} from "./entities/test-quiz.entity";
import {Repository} from "typeorm";
import {Question} from "../questions/entities/question.entity";

@Injectable()
export class TestQuizService {
  constructor(
      @InjectRepository(TestQuiz)
      private testQuizRepository: Repository<TestQuiz>,
      @InjectRepository(Question)
      private QuestionRepository: Repository<Question>,
  ) {}
  create(createTestQuizDto: CreateTestQuizDto): Promise<TestQuiz> {
    const testQuiz = this.testQuizRepository.create(createTestQuizDto);
    return this.testQuizRepository.save(testQuiz);
  }

  findAll(): Promise<TestQuiz[]> {
    return this.testQuizRepository.find({ relations: ['milestone', 'questions'] });
  }

  async findOne(quizID: number): Promise<TestQuiz> {
    const testQuiz = await this.testQuizRepository.findOne({
      where: { quizID },
      relations: ['milestone', 'questions'],
    });
    if (!testQuiz) {
      throw new NotFoundException(`TestQuiz with ID #${quizID} not found`);
    }
    return testQuiz;
  }
  async addQuestionToQuiz(quizID: number, questionId: number): Promise<TestQuiz> {
    const quiz = await this.testQuizRepository.findOne({
      where: { quizID },
      relations: ['questions'],
    });

    if (!quiz) {
      throw new NotFoundException(`TestQuiz with ID #${quizID} not found`);
    }

    const question = await this.QuestionRepository.findOneBy({ id: questionId });
    if (!question) {
      throw new NotFoundException(`Question with ID #${questionId} not found`);
    }

    quiz.questions = [...quiz.questions, question];
    return this.testQuizRepository.save(quiz);
  }

  async removeQuestionFromQuiz(quizID: number, questionId: number): Promise<TestQuiz> {
    const quiz = await this.testQuizRepository.findOne({
      where: { quizID },
      relations: ['questions'],
    });

    if (!quiz) {
      throw new NotFoundException(`TestQuiz with ID #${quizID} not found`);
    }

    quiz.questions = quiz.questions.filter(question => question.id !== questionId);
    return this.testQuizRepository.save(quiz);
  }

  async remove(quizID: number): Promise<void> {
    const result = await this.testQuizRepository.delete(quizID);
    if (result.affected === 0) {
      throw new NotFoundException(`TestQuiz with ID #${quizID} not found`);
    }
  }
}
