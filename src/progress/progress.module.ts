import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import {Progress} from "./entities/progress.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Milestone} from "../milestone/entities/milestone.entity";
import {Validation} from "../validations/entities/validation.entity";
import {UsersService} from "../users/users.service";
import {RoadmapService} from "../roadmaps/roadmaps.service";
import {User} from "../users/entities/user.entity";
import {Roadmap} from "../roadmaps/entities/roadmap.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Progress,Milestone,Validation,User,Roadmap])],

  controllers: [ProgressController],
  providers: [ProgressService,UsersService,RoadmapService],
})
export class ProgressModule {}
