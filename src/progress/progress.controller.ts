import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import {UsersService} from "../users/users.service";
import {RoadmapService} from "../roadmaps/roadmaps.service";

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService, private readonly UsersService:UsersService, private readonly RoadmapService:RoadmapService) {}

  @Post()
  create(@Body() createProgressDto: CreateProgressDto) {
    return this.progressService.create(createProgressDto);
  }

  @Get()
  findAll() {
    return this.progressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressService.findOne(+id);
  }
<<<<<<< HEAD

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto) {
    return this.progressService.update(+id, updateProgressDto);
=======
/*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto) {
    return this.progressService.update(+id, updateProgressDto);
  }*/
  @Post('/subscribe')
  subscribeUser(
      @Body('userId', ParseIntPipe) userId: number,
      @Body('roadmapId', ParseIntPipe) roadmapId: number
  ){
    this.UsersService.addRoadmap(userId,roadmapId);
    this.RoadmapService.addUserToRoadmap(roadmapId,userId);
    return this.progressService.subscribeUserToRoadmap(userId, roadmapId);
>>>>>>> main
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressService.remove(+id);
  }
}
