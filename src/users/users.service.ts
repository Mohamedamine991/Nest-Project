import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {DeleteResult, Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Roadmap} from "../roadmaps/entities/roadmap.entity";
import {Milestone} from "../milestone/entities/milestone.entity";
import { CrudService } from '../common/crud.service';

@Injectable()
export class UsersService extends CrudService<User> {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {
    super(userRepository)
  }


  async DeleteUser(id: number): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return { message: `User with ID "${id}" has been successfully deleted` };
  }
 /*
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id: id});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
*/


}