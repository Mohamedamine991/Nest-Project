import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, Req} from '@nestjs/common';
import { ValidationsService } from './validations.service';
import { CreateValidationDto } from './dto/create-validation.dto';
import { ConfirmValidationDto } from './dto/confirm-validation.dto';

@Controller('validations')
export class ValidationsController {
  constructor(private readonly validationsService: ValidationsService) {}

  @Post()
  create(@Body() createValidationDto: CreateValidationDto,@Req() req:Request) {
    const userId=req['user']['id']
    createValidationDto.userId=userId
    return this.validationsService.createValidation(createValidationDto);
  }
  @Patch('confirm')
  validate(@Body() confirmvalidationdto:ConfirmValidationDto,@Req() req:Request){
      const userId=req['user']['id']
      confirmvalidationdto.userId=userId
      return this.validationsService.calculateAndUpdateScore(confirmvalidationdto)
  }
  @Get()
  findAll() {
    return this.validationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.validationsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.validationsService.remove(+id);
  }
}
