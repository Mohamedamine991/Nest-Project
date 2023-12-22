import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get(':userId/roadmaps')
  getUserSubscribedRoadmaps(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getUserSubscribedRoadmaps(userId);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get(':userId/roadmaps/:roadmapId/milestones')
  getUserMilestonesInRoadmap(
      @Param('userId', ParseIntPipe) userId: number,
      @Param('roadmapId', ParseIntPipe) roadmapId: string
  ) {
    return this.usersService.getUserMilestonesInRoadmap(userId, roadmapId);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }



  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}