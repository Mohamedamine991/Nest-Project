import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { TestQuiz } from '../../test-quiz/entities/test-quiz.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
 id: number;

  @Column({nullable:false})
  content: string;

  @Column({ nullable:false}) 
  option2: string ;
 @Column({ nullable:false})
 option3: string ;
 @Column({ nullable:false})
 option4: string ;
 @Column({ nullable:false})
 option1: string ;

  @Column({nullable:false})
  correctOption: number;


  @ManyToOne(() => TestQuiz, testQuiz => testQuiz.questions)
  testQuiz: TestQuiz;
}

