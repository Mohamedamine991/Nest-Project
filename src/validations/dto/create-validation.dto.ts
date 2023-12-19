import { IsBoolean, IsNumber, IsDate } from 'class-validator';

export class CreateValidationDto {
    @IsNumber()
    readonly userId: number;

    @IsNumber()
    readonly milestoneId: number;

    @IsBoolean()
    readonly passed: boolean;

    @IsNumber()
    readonly score: number;

    @IsDate()
    readonly date: Date = new Date(); // Default to the current date
}