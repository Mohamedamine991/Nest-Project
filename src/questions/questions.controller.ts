import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuizAnswersDto } from './dto/quiz-answers.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}


  //1-tester le seed
  @Get('testseed')
  seedQuestions() {
    return this.questionsService.seedQuestions();
  }


  //2-get les questions d'un quiz
  @Get('by-quiz/:quizID')
  async getByQuiz(@Param('quizID') quizID: string) {
    return this.questionsService.getQuestionsByQuiz(quizID);
  }


  //3-le nbre des questions d'un quiz
  @Get('count/:quizId')
  async getCountByQuizId(@Param('quizId') quizId: string) {
    const count = await this.questionsService.getCountByQuizId(quizId);
    return { questionCount: count };
  }


  //4-ajouter une question
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
  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }*/


  //8-supprimer une question
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }


   //9-verifier la reponse d'une question
  @Post(':id/verify')
  async verify(@Param('id') id: string, @Body('answer') answer: number) {
    const isCorrect = await this.questionsService.verifyAnswer(+id, answer);
    return { correct: isCorrect };
  }


  //10-verifier les reponses d'un quiz
  @Post('verify-quiz')
  async verifyQuiz(@Body() quizAnswersDto: QuizAnswersDto) {
    return this.questionsService.verifyQuizAnswers(quizAnswersDto);
  }
}