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

  @Get()
  findAll() {
    return this.testQuizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testQuizService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestQuizDto: UpdateTestQuizDto) {
    return this.testQuizService.update(+id, updateTestQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testQuizService.remove(+id);
  }
}
