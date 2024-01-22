import { IsBoolean, IsNumber, IsOptional, IsDate, IsString } from 'class-validator';

export class UpdateValidationDto {
    @IsNumber()
    readonly userId: number;

    @IsString()
    readonly milestoneId: string;

    @IsBoolean()
    readonly passed?: boolean;

    @IsNumber()
    readonly score?: number;
}