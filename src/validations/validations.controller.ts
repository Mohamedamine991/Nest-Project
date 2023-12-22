import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { ValidationsService } from './validations.service';
import { CreateValidationDto } from './dto/create-validation.dto';

@Controller('validations')
export class ValidationsController {
  constructor(private readonly validationsService: ValidationsService) {}

  @Post()
  create(@Body() createValidationDto: CreateValidationDto) {
    return this.validationsService.createValidation(createValidationDto);
  }

  @Post()
  addValidation(
      @Body('userId', ParseIntPipe) userId: number,
      @Body('milestoneId', ParseIntPipe) milestoneId: string
  ) {
    return this.validationsService.addValidation(userId, milestoneId);
  }

  @Get()
  findAll() {
    return this.validationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.validationsService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() score: number) {
    return this.validationsService.updateValidation(id,score);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.validationsService.remove(+id);
  }
}
