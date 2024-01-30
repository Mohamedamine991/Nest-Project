import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpStatus, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuizAnswersDto } from './dto/quiz-answers.dto';
import { response } from 'express';
import { AccessConctrolGuard } from '../Gaurds/roles.guard';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}


  //1-tester le seed
  @Get('testseed')
  seedQuestions() {
    return this.questionsService.seedQuestions();
  }
  @Get('by-quiz/:quizID')
  async getByQuiz(@Param('quizID') quizID: number) {
    return this.questionsService.getQuestionsByQuiz1(quizID);
  }
  @Get('count/:quizId')
  async getCountByQuizId(@Param('quizId') quizId: number) {
    const count = await this.questionsService.getCountByQuizId(quizId);
    return { questionCount: count };
  }
  //@UseGuards(AccessConctrolGuard)
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }


  //5-get toutes les questions
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }


  //6-get une question par id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }


  //7-modifier une question
  @UseGuards(AccessConctrolGuard)
  @Patch(':id')
  updateQuestion1(@Param('id') questionID: number, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(questionID, updateQuestionDto);
  }

  //8-supprimer une question
  @UseGuards(AccessConctrolGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.questionsService.deleteQuestion(+id);
  }

  //9-supprimer une question avec soft delete
  @UseGuards(AccessConctrolGuard)
  @Delete('/soft/:id')
  async removesoft(@Param('id') id: string) {
    return this.questionsService.deleteQuestionv2(+id);
  }
   //9-verifier la reponse d'une question
  @UseGuards(AccessConctrolGuard)
  @Post(':id/verify')
  async verify(@Param('id') id: string, @Body('answer') answer: number) {
    const isCorrect = await this.questionsService.verifyAnswer(+id, answer);
    return { correct: isCorrect };
  }


  //10-verifier les reponses d'un quiz
  @UseGuards(AccessConctrolGuard)
  @Post('verify-quiz')
  async verifyQuiz(@Body() quizAnswersDto: QuizAnswersDto) {
    return this.questionsService.verifyQuizAnswers(quizAnswersDto);
  }
}