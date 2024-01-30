import { PartialType } from '@nestjs/mapped-types';
import { CreateRoadmapDto } from './create-roadmap.dto';
import { IsString } from 'class-validator';

export class UpdateRoadmapDto extends PartialType(CreateRoadmapDto) {
@IsString()
 title?: string;
@IsString()
 domain?: string;
@IsString()
 description?: string;
}
