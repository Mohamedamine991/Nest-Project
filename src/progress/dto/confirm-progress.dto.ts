// update-progress.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ConfirmUpdateProgressDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;
    @IsNotEmpty()
    @IsString()
    readonly roadmapId: string;
}
