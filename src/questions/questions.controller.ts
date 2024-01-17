import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuizAnswersDto } from './dto/quiz-answers.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  //tester le seed
  @Get('testseed')
  seedQuestions() {
    return this.questionsService.seedQuestions();
  }

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  


  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }

  @Post(':id/verify')
  async verify(@Param('id') id: string, @Body('answer') answer: number) {
    const isCorrect = await this.questionsService.verifyAnswer(+id, answer);
    return { correct: isCorrect };
  }

  @Post('verify-quiz')
  async verifyQuiz(@Body() quizAnswersDto: QuizAnswersDto) {
    return this.questionsService.verifyQuizAnswers(quizAnswersDto);
  }


}