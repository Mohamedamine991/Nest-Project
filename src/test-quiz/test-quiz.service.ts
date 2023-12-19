import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestQuiz } from './entities/test-quiz.entity';
import { CreateTestQuizDto } from './dto/create-test-quiz.dto';
import { UpdateTestQuizDto } from './dto/update-test-quiz.dto';
import { Question } from '../questions/entities/question.entity';

@Injectable()
export class TestQuizService {
  constructor(
    @InjectRepository(TestQuiz)
    private readonly testQuizRepository: Repository<TestQuiz>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>, // Ajoutez cette ligne

  ) {}

  async createQuizIfNotExists(title: string): Promise<TestQuiz> {
    let quiz = await this.testQuizRepository.findOneBy({ title });
    if (!quiz) {
      quiz = this.testQuizRepository.create({ title });
      await this.testQuizRepository.save(quiz);
    }
    return quiz;
  }

  async addQuestionToQuiz(quiz: TestQuiz, questionData: any): Promise<Question> {
    const question = this.questionRepository.create({
      content: questionData.content, 
      options: questionData.options,  
      correctOption: questionData.correctOption,  
      testQuiz: quiz 
    });
  
    return this.questionRepository.save(question);
  }

  async create(createTestQuizDto: CreateTestQuizDto): Promise<TestQuiz> {
    const newTestQuiz = this.testQuizRepository.create(createTestQuizDto);
    return this.testQuizRepository.save(newTestQuiz);
  }

  async createDomainQuizzes(): Promise<void> {
    const domains = ['Machine Learning', 'DevOps', 'Sécurité', 'Réseau'];
    for (const title of domains) {
      const quiz = this.testQuizRepository.create({ title });
      await this.testQuizRepository.save(quiz);
    }
  }

  async findAll(): Promise<TestQuiz[]> {
    return this.testQuizRepository.find();
  }

  async findOne(id: number): Promise<TestQuiz> {
    return this.testQuizRepository.findOneBy({ quizID: id });
  }

  async update(id: number, updateTestQuizDto: UpdateTestQuizDto): Promise<TestQuiz> {
    await this.testQuizRepository.update(id, updateTestQuizDto);
    return this.testQuizRepository.findOneBy({ quizID: id });
  }

  async remove(id: number): Promise<void> {
    await this.testQuizRepository.delete(id);
  }
}
