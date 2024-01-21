// update-progress.dto.ts
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ConfirmUpdateProgressDto {
    @IsNumber()
    readonly userId: number;
    @IsString()
    readonly roadmapId: string;
}
