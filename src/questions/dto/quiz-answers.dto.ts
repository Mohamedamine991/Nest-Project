export class QuizAnswerDto {
          questionId: number;
          userAnswer: number; 
        }
        
        export class QuizAnswersDto {
          answers: QuizAnswerDto[];
        }
        