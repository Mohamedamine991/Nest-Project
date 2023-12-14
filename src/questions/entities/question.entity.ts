import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { TestQuiz } from '../../test-quiz/entities/test-quiz.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
 id: number;

  @Column({nullable:false})
  content: string;

  @Column({ nullable:false}) 
  options: string [4];

  @Column({nullable:false})
  correctOption: number;


  @ManyToOne(() => TestQuiz, testQuiz => testQuiz.questions)
  testQuiz: TestQuiz;
}

