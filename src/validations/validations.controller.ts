import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, Req, UseGuards} from '@nestjs/common';
import { ValidationsService } from './validations.service';
import { CreateValidationDto } from './dto/create-validation.dto';
import { ConfirmValidationDto } from './dto/confirm-validation.dto';
import { AuthGuard } from '../Gaurds/jwt-auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('validations')
export class ValidationsController {
  constructor(private readonly validationsService: ValidationsService) {}

  @Post()
  create(@Body() createValidationDto: CreateValidationDto,@User() user) {
    createValidationDto.userId=user.id
    return this.validationsService.createValidation(createValidationDto);
  }
  @UseGuards(AuthGuard)
  @Patch('confirm')
  validate(@Body() confirmvalidationdto:ConfirmValidationDto,@User() user){
      confirmvalidationdto.userId=user.id
      return this.validationsService.calculateAndUpdateScore(confirmvalidationdto)
  }
  @UseGuards(AuthGuard)
  @Get('getData/:milestoneId')
    getValidationByUserAndMilestone(@Param('milestoneId') milestoneId:string,@User() user){
      return this.validationsService.getValidationByUserAndMilestone(milestoneId,user.id)
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
