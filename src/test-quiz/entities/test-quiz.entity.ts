import { Entity, Column, OneToOne, OneToMany , PrimaryColumn } from 'typeorm';
import { Milestone } from '../../milestone/entities/milestone.entity';
import { Question } from '../../questions/entities/question.entity';


@Entity()
export class TestQuiz {
  @PrimaryColumn()
  id: number;

  @Column({nullable:false})
  title: string;

  @OneToOne(() => Milestone, milestone => milestone.quiz)
  milestone: Milestone;
  
  @OneToMany(() => Question, question => question.testQuiz , { cascade: true } )
  questions: Question[];
}
