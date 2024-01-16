// create-roadmap.dto.ts

import { IsEmpty } from 'class-validator';

export class CreateRoadmapDto {
 roadmapID:string;
 title: string;
 domain: string;
 description: string;
}
