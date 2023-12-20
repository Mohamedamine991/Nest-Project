import { IsNumber, IsOptional } from 'class-validator';

export class CreateProgressDto {
  readonly userId: number;

  @IsNumber()
  readonly roadmapId: number;

  @IsNumber()
  @IsOptional()
  readonly percentage: number = 0; // Default to 0 if not provided
}
