import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValidationsService } from './validations.service';
import { CreateValidationDto } from './dto/create-validation.dto';
import { UpdateValidationDto } from './dto/update-validation.dto';

@Controller('validations')
export class ValidationsController {
  constructor(private readonly validationsService: ValidationsService) {}

  @Post()
  create(@Body() createValidationDto: CreateValidationDto) {
    return this.validationsService.create(createValidationDto);
  }

  @Get()
  findAll() {
    return this.validationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.validationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateValidationDto: UpdateValidationDto) {
    return this.validationsService.update(+id, updateValidationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.validationsService.remove(+id);
  }
}
