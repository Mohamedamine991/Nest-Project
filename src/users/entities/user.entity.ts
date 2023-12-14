import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Roadmap } from '../../roadmaps/entities/roadmap.entity';
import { Milestone } from '../../milestone/entities/milestone.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false, unique: true })
  username: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column({ length: 100, nullable: false, unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @ManyToMany(() => Roadmap, roadmap => roadmap.users, { cascade: true })
  @JoinTable()
  roadmaps: Roadmap[];

  @ManyToMany(() => Milestone, milestone => milestone.users)
  @JoinTable()
  milestones: Milestone[];
}


