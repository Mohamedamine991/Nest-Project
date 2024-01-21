
import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ConfirmUpdateProgressDto } from './dto/confirm-progress.dto';


@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService){}
  @Post('suivreRoadmap')
  create(@Body() createProgressDto: CreateProgressDto) {
    return this.progressService.create(createProgressDto);
  }
  @Post('confirm')
  confirm(@Body() confirmUpdateProgressDto:ConfirmUpdateProgressDto){
    return this.progressService.updateProgressByUserAndRoadmap(confirmUpdateProgressDto)
  }
  @Get()
  findAll(){
    return this.progressService.findAll()
  }
}
