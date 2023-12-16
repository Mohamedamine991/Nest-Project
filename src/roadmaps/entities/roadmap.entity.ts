import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Milestone } from '../../milestone/entities/milestone.entity';

@Entity()
export class Roadmap {
  @PrimaryGeneratedColumn()
  roadmapID: number;

  @Column({nullable: false })
  title: string;

  @Column({ nullable: false})
  domain: string;

  @Column({ nullable:false })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Milestone, milestone => milestone.roadmap)
  milestones: Milestone[];
}

