import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, Req, UseGuards} from '@nestjs/common';
import { ValidationsService } from './validations.service';
import { CreateValidationDto } from './dto/create-validation.dto';
import { ConfirmValidationDto } from './dto/confirm-validation.dto';
import { AuthGuard } from '../Gaurds/jwt-auth.guard';

@Controller('validations')
export class ValidationsController {
  constructor(private readonly validationsService: ValidationsService) {}

  @Post()
  create(@Body() createValidationDto: CreateValidationDto,@Req() req:Request) {
    const userId=req['user']['id']
    createValidationDto.userId=userId
    return this.validationsService.createValidation(createValidationDto);
  }
  @UseGuards(AuthGuard)
  @Patch('confirm')
  validate(@Body() confirmvalidationdto:ConfirmValidationDto,@Req() req:Request){
      console.log(req['user'])
      const userId:number=req['user']['id']
      console.log(userId)
      confirmvalidationdto.userId=userId
      return this.validationsService.calculateAndUpdateScore(confirmvalidationdto)
  }
  @UseGuards(AuthGuard)
  @Get('getData/:milestoneId')
    getValidationByUserAndMilestone(@Param('milestoneId') milestoneId:string,@Req() req:Request){
      console.log(req['user'])
      const userId=req['user']['id']
      console.log(userId)
      return this.validationsService.getValidationByUserAndMilestone(milestoneId,+userId)
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
