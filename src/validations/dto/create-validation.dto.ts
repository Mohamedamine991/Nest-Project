import { IsBoolean, IsNumber, IsDate, IsString } from 'class-validator';

export class CreateValidationDto {
    @IsNumber()
    readonly userId: number;

    @IsString()
    readonly milestoneId: string;

    @IsBoolean()
    readonly passed: boolean;

    @IsNumber()
    readonly score: number;
}