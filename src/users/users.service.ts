import {Injectable, NotFoundException} from '@nestjs/common';

import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import { CrudService } from '../common/crud.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService extends CrudService<User>{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
   return user
  }
  
}
