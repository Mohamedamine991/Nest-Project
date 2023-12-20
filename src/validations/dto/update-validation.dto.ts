import { IsBoolean, IsNumber, IsOptional, IsDate } from 'class-validator';

export class UpdateValidationDto {

    @IsNumber()
    @IsOptional()
    readonly score?: number;
}
