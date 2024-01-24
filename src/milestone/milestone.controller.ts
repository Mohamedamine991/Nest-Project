import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';

@Controller('milestone')
export class MilestoneController {
  constructor(private readonly milestoneService: MilestoneService) {
    
  }

  @Get('testseed')
  seedsMilestones() {
    return this.milestoneService.seedMilestones();
  }
  @Post()
  create(@Body() createMilestoneDto: CreateMilestoneDto) {
    return this.milestoneService.create(createMilestoneDto);
  }
  
  @Get()
  findAll() {
    return this.milestoneService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.milestoneService.findOne(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.milestoneService.remove(id);
  }
  @Get('byRoadmap/:roadmapId')
  findMilestonesByRoadmap(@Param('roadmapId') roadmapId: string) {
    return this.milestoneService.findMilestonesByRoadmap(roadmapId);
  }

  
}
