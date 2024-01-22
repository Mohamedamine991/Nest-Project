import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProgressDto {
  @IsNumber()
  userId: number;
  @IsString()
  roadmapId: string;
  @IsNumber()
  @IsOptional()
  percentage: number = 0; // Default to 0 if not provided
}