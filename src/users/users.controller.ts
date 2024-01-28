import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, Res, UseGuards, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../Gaurds/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return  await this.usersService.deleteUser(id);  }

    @Delete('/soft/:id')
  async removesoft(@Param('id') id: string) {
    return  await this.usersService.deleteUserv2(id);  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('getuser')
  async getUserById(@Req() req:Request ) {
    const id=req['user']['id']
    return await this.usersService.getUserById(id);
  }

  @Get(':id/totalscore')
  async getTotalScore(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getTotalScore(id);
  }
  @UseGuards(AuthGuard)
  @Post('reset')
  async update(@Body() updateUserDto: UpdateUserDto,@Req() req:Request ) {
    const userId=req['user']['id']
    return await this.usersService.updateUser(userId, updateUserDto);
  }
  

} 