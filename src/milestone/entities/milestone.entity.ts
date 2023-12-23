/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Roadmap } from '../../roadmaps/entities/roadmap.entity';
import { User } from '../../users/entities/user.entity';
import { RecommandedCertification} from '../../recommanded-certifications/entities/recommanded-certification.entity';
import { RecommandedCourse } from '../../recommanded-courses/entities/recommanded-course.entity';
import { TestQuiz } from '../../test-quiz/entities/test-quiz.entity';

@Entity()
export class Milestone {
  @PrimaryColumn()
  milestoneId: string;

  @ManyToOne(() => Roadmap, roadmap => roadmap.milestones)
  roadmap: Roadmap;

  @ManyToMany(() => User, user => user.milestones)
  @JoinTable()
  users: User[];
  @OneToMany(() => RecommandedCertification, recommandedCertification => recommandedCertification.milestone)
  recommandedCertifications: RecommandedCertification[];
  @OneToMany(() => RecommandedCourse, recommandedCourse => recommandedCourse.milestone)
  recommandedCourses: RecommandedCourse[];
  @OneToOne(() => TestQuiz, testQuiz => testQuiz.milestone)
  @JoinColumn()
  quiz: TestQuiz;

  @Column({ default: false })
  passed: boolean;

  @Column({ type: 'float' })
  score: number;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
