import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { AccessConctrolGuard } from '../Gaurds/roles.guard';

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
  @UseGuards(AccessConctrolGuard)
  @Patch()
  update(@Param('id') id :string,@Body() updateMilestoneDto:UpdateMilestoneDto){
    return this.milestoneService.update(id,updateMilestoneDto)
  }
  
  @Get()
  findAll() {
    return this.milestoneService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.milestoneService.findOne(id);
  }
  @UseGuards(AccessConctrolGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.milestoneService.deleteMilestone(id);
  }

  @UseGuards(AccessConctrolGuard)
  @Delete('/soft/:id')
  removesoft(@Param('id') id: string) {
    return this.milestoneService.deleteMilestonev2(id);
  }
  @Get('byRoadmap/:roadmapId')
  findMilestonesByRoadmap(@Param('roadmapId') roadmapId: string) {
    return this.milestoneService.findMilestonesByRoadmap(roadmapId);
  }

  
}
