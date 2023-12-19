import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestQuizService } from './test-quiz.service';
import { CreateTestQuizDto } from './dto/create-test-quiz.dto';
import { UpdateTestQuizDto } from './dto/update-test-quiz.dto';

@Controller('test-quiz')
export class TestQuizController {
  constructor(private readonly testQuizService: TestQuizService) {}

  @Post()
  create(@Body() createTestQuizDto: CreateTestQuizDto) {
    return this.testQuizService.create(createTestQuizDto);
  }
  @Patch(':quizID/add-question/:questionId')
  addQuestion(@Param('quizID') quizID: number, @Param('questionId') questionId: number) {
    return this.testQuizService.addQuestionToQuiz(quizID, questionId);
  }

  @Patch(':quizID/remove-question/:questionId')
  removeQuestion(@Param('quizID') quizID: number, @Param('questionId') questionId: number) {
    return this.testQuizService.removeQuestionFromQuiz(quizID, questionId);
  }

  @Get()
  findAll() {
    return this.testQuizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testQuizService.findOne(+id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testQuizService.remove(+id);
  }
}
