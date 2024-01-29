import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards} from '@nestjs/common';
import { RoadmapService } from './roadmaps.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserRoleEnum } from '../enums/user-role.enum';
import { AuthGuard } from '../Gaurds/jwt-auth.guard';
import { AccessConctrolGuard } from '../Gaurds/roles.guard';


@Controller('roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapService) {}
  @UseGuards(AccessConctrolGuard)
  @Post()
  create(@Body() createRoadmapDto: CreateRoadmapDto) {
    return this.roadmapsService.create(createRoadmapDto);
  }
  @UseGuards(AccessConctrolGuard)
  @Patch(':id')
  update(@Param('id') id,@Body() updateRoadmapDto:UpdateRoadmapDto){
    return this.roadmapsService.update(id,updateRoadmapDto)
  }


@Get()
  findAll() {
    return this.roadmapsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.roadmapsService.findOne(id);
  }
  @UseGuards(AccessConctrolGuard)
  @Delete(':id')
    async remove(@Param('id') id: string) {
      return await this.roadmapsService.deleteRoadmap(id);
    }

    @UseGuards(AccessConctrolGuard)
    @Delete('/soft/:id')
    async removesoft(@Param('id') id: string) {
      return await this.roadmapsService.deleteRoadmapv2(id);
    }
}
