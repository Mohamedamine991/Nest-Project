// update-progress.dto.ts
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProgressDto {
    @IsNumber()
    @IsOptional()
    readonly userId?: number;

    @IsNumber()
    @IsOptional()
    readonly roadmapId?: number;

    @IsNumber()
    @IsOptional()
    readonly percentage?: number;
}
