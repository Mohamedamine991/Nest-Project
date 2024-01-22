import { IsArray, IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @Length(4, 4, { message: "A question must have exactly 4 options." })
  @IsString({ each: true })
  options: string[];

  @IsInt()
  @IsNotEmpty()
  @Min(0, { message: "Correct option index must be >= 0." })
  correctOption: number;

  @IsInt()
  @IsNotEmpty()
  testQuizId: number;
}
