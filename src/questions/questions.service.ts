import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuizAnswersDto } from './dto/quiz-answers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../common/crud.service';
import { TestQuiz } from '../test-quiz/entities/test-quiz.entity';
import * as fs from 'fs';
import * as path from 'path';

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
  //6-get une question par id
  async findOne(id: number): Promise<Question> {
    return this.questionsRepository.findOneBy({ questionID: id });
  }
  /*//7-modifier une question
  async update(id: number, updateQuestionDto): Promise<Question> {
    await this.questionsRepository.update(id, updateQuestionDto);
    return this.questionsRepository.findOneBy({ questionID: id });
  }*/

  //8-supprimer une question
  async remove(id: number): Promise<DeleteResult> {
    return await this.questionsRepository.delete(id);
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
  





