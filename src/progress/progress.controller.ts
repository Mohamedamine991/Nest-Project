
import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, Req, UseGuards} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ConfirmUpdateProgressDto } from './dto/confirm-progress.dto';
import { AuthGuard } from '../Gaurds/jwt-auth.guard';


@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService){}
  @UseGuards(AuthGuard)
  @Post('suivreRoadmap')
  create(@Body() createProgressDto: CreateProgressDto,@Req() req:Request) {
    const userId=req['user']['id']
    createProgressDto.userId=userId
    return this.progressService.create(createProgressDto);
  }

  @UseGuards(AuthGuard)
  @Patch('confirm')
  confirm(@Body() confirmUpdateProgressDto:ConfirmUpdateProgressDto,@Req() req:Request){
    const userId=req['user']['id']
    confirmUpdateProgressDto.userId=userId
    return this.progressService.updateProgressByUserAndRoadmap(confirmUpdateProgressDto)
  }
  @Get()
  findAll(){
    return this.progressService.findAll()
  }
  @UseGuards(AuthGuard)
  @Get('getprogress/:roadmapId')
getProgressByUserAndRoadmap(@Param('roadmapId') roadmapId: string,@Req() req:Request) {
  const userId=req['user']['id']
  return this.progressService.getProgressByUserAndRoadmap(userId, roadmapId);
}
  }


