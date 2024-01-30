import { PartialType } from '@nestjs/mapped-types';
import { CreateTestQuizDto } from './create-test-quiz.dto';
import { IsString } from 'class-validator';

export class UpdateTestQuizDto extends PartialType(CreateTestQuizDto) {
    @IsString()
    title?: string;
}
