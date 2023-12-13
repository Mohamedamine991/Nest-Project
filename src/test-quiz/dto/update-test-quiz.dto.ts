import { PartialType } from '@nestjs/mapped-types';
import { CreateTestQuizDto } from './create-test-quiz.dto';

export class UpdateTestQuizDto extends PartialType(CreateTestQuizDto) {}
