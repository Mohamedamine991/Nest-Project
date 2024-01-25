import { IsBoolean, IsNumber, IsDate, IsString, IsNotEmpty, IsArray } from 'class-validator';

export class ConfirmValidationDto {
    userId?: number;
    @IsNotEmpty()
    @IsString()
    readonly milestoneId: string;
    @IsNotEmpty()
    @IsArray()
    readonly userAnswers: number[];
}