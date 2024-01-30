import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TestQuizService } from './test-quiz.service';
import { CreateTestQuizDto } from './dto/create-test-quiz.dto';
import { UpdateTestQuizDto } from './dto/update-test-quiz.dto';
import { TestQuiz } from './entities/test-quiz.entity';
import { AccessConctrolGuard } from '../Gaurds/roles.guard';

@Controller('quiz')
export class TestQuizController {
  constructor(private readonly testQuizService: TestQuizService) {}

  @Get('testseed')
  seedTestQuizzes() {
    return this.testQuizService.seedTestQuizzes();
  }


 @UseGuards(AccessConctrolGuard)
  @Post()
  async createQuiz(@Body() createTestQuizDto: CreateTestQuizDto): Promise<TestQuiz> {
    return this.testQuizService.createQuiz(createTestQuizDto);
  }


  @Post('/createquizzes')
  createDomainQuizzes() {
    return this.testQuizService.createDomainQuizzes();
  }
  
  @Get()
  findAll() {
    return this.testQuizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.testQuizService.findOne(id);
  }

  @Get('/title/:title')
  findByTitle(@Param('title') title: string) {
    return this.testQuizService.findByTitle(title);
  }
  @UseGuards(AccessConctrolGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTestQuizDto: UpdateTestQuizDto) {
    return this.testQuizService.update(id, updateTestQuizDto);
  }
  @UseGuards(AccessConctrolGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.testQuizService.DeleteQuiz(id);
  }
  
}