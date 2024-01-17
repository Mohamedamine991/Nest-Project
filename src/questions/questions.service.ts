import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuizAnswersDto } from './dto/quiz-answers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TestQuiz } from '../test-quiz/entities/test-quiz.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class QuestionsService {
  constructor(
      @InjectRepository(Question)
      private questionsRepository: Repository<Question>,
      @InjectRepository(TestQuiz)
      private testQuizRepository: Repository<TestQuiz>,
      
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const newQuestion = this.questionsRepository.create(createQuestionDto);
    return this.questionsRepository.save(newQuestion);
  }

  async findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  async findOne(id: number): Promise<Question> {
    return this.questionsRepository.findOneBy({ questionID: id });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    await this.questionsRepository.update(id, updateQuestionDto);
    return this.questionsRepository.findOneBy({ questionID: id });
  }


  async remove(id: number): Promise<void> {
    await this.questionsRepository.delete(id);
  }

  async verifyAnswer(questionId: number, userAnswer: number): Promise<boolean> {
    const question = await this.questionsRepository.findOneBy({ questionID: questionId });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question.correctOption === userAnswer;
  }


  async verifyQuizAnswers(quizAnswersDto: QuizAnswersDto): Promise<any> {
    let correctCount = 0;

    const results = await Promise.all(
        quizAnswersDto.answers.map(async (answer) => {
          const isCorrect = await this.verifyAnswer(answer.questionId, answer.userAnswer);
          if (isCorrect) {
            correctCount++;
          }
          return {
            questionId: answer.questionId,
            isCorrect,
          };
        })
    );

    const score = (correctCount / quizAnswersDto.answers.length) * 100;

    return {
      results,
      score: `${score.toFixed(2)}`
    };
  }
  async seedQuestions() {
    const filePath = path.join(__dirname, '../../data/question.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const questionData = JSON.parse(rawData);
    console.log(questionData);
  
    for (const qData of questionData) {
      const question = new Question();
  
      question.content = qData.content;
      question.options = JSON.stringify(qData.options); 
      question.correctOption = qData.correctOption;
  
      const testQuiz = await this.testQuizRepository.findOne({
        where: { quizID: qData.testQuizQuizID }
      });
  
      if (testQuiz) {
        question.testQuiz = testQuiz;
      } else {
         console.warn(`TestQuiz "${qData.testQuizQuizID}" not found for question.`);
      }
  
      await this.questionsRepository.save(question);
    }
  } 

  }
