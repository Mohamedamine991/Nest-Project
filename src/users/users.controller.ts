import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, Res} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return  await this.usersService.DeleteUser(+id);  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

}