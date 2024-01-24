import { Body, Injectable, NotFoundException, Param, Patch } from '@nestjs/common';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../common/crud.service';
import { TestQuiz } from '../test-quiz/entities/test-quiz.entity';
import * as fs from 'fs';
import * as path from 'path';
import { QuizAnswersDto } from './dto/quiz-answers.dto';

@Injectable()
export class QuestionsService extends CrudService<Question>{
  constructor(
      @InjectRepository(Question)
      private questionsRepository: Repository<Question>,
      @InjectRepository(TestQuiz)
      private testQuizRepository: Repository<TestQuiz>,

  ) {super(questionsRepository)}

  

  //1-tester le seed  
  async seedQuestions() {
    const filePath = path.join(__dirname, '../../data/question.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const questionData = JSON.parse(rawData);
  

    for (const qData of questionData) {
      const question = new Question();

      question.content = qData.content;
      question.options = qData.options; 
      question.correctOption = qData.correctOption;

      const testQuiz = await this.testQuizRepository.findOne({
        where: { id: qData.testQuizId }
      });

      if (testQuiz) {
        question.testQuiz = testQuiz;
      } else {
         console.warn(`TestQuiz "${qData.testQuizId}" not found for question.`);
      }

      await this.questionsRepository.save(question);
    }
  } 


  //2-get les questions d'un quiz
  async getQuestionsByQuiz(id: number): Promise<Question[]> {
    return this.questionsRepository.find({
      where: { testQuiz: { id } },
    });
  }

  
  //3-le nbre des questions d'un quiz
  async getCountByQuizId(id: number): Promise<number> {
    return this.questionsRepository.count({ where: { testQuiz: { id: id } } });
  }


    //4-ajouter une question
  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const quiz = await this.testQuizRepository.findOne({ where: { id: createQuestionDto.testQuizId } });
    
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${createQuestionDto.testQuizId} not found. Please create the quiz first.`);
    }
  
    const question = this.questionsRepository.create({
      content: createQuestionDto.content,
      options: createQuestionDto.options,
      correctOption: createQuestionDto.correctOption,
      testQuiz: quiz, 
    });
  
    return this.questionsRepository.save(question);
  }

  //5-get toutes les questions
  async findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }


  //7-modifier une question
  async updateQuestion(questionID: number, updateDto: UpdateQuestionDto): Promise<Question> {
    const question = await this.questionsRepository.findOne({ where: { questionID } });
    if (!question) {
      throw new NotFoundException(`Question with ID ${questionID} not found.`);
    }

    if (updateDto.testQuizId !== undefined) {
      const testQuiz = await this.testQuizRepository.findOne({ where: { id: updateDto.testQuizId } });
      if (!testQuiz) {
        throw new NotFoundException(`TestQuiz with ID ${updateDto.testQuizId} not found.`);
      }
      question.testQuiz = testQuiz;
    }
    Object.assign(question, updateDto);

    return this.questionsRepository.save(question);
  }


  async updateQuestion1(id: number, updateDto: UpdateQuestionDto): Promise<Question> {
    const findOneOptions: FindOneOptions = {
      where: { questionID:  id },
    }
    const question = await this.questionsRepository.findOne(findOneOptions);

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found.`);
    }

    if (updateDto.testQuizId) {
      const testQuiz = await this.testQuizRepository.findOne({ where: { id: updateDto.testQuizId } });
      if (!testQuiz) {
        throw new NotFoundException(`TestQuiz with ID ${updateDto.testQuizId} not found.`);
      }
      question.testQuiz = testQuiz;
    }

    return super.update(id, updateDto);
  }

 
  //8-supprimer une question
  async deleteQuestion(id: number): Promise<string> {
    const result = await this.questionsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }

    return `Question with ID "${id}" has been successfully deleted`;
  }
  //9-verifier la reponse d'une question
  async verifyAnswer(questionId: number, userAnswer: number): Promise<boolean> {
    const question = await this.questionsRepository.findOneBy({ questionID: questionId });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question.correctOption === userAnswer;
  }

  //10-verifier les reponses d'un quiz
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

}
  





