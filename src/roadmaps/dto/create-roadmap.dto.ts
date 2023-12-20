// create-roadmap.dto.ts

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoadmapDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly domain: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    // Add other properties as needed
}
