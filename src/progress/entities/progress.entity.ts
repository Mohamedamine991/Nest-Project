import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Roadmap } from '../../roadmaps/entities/roadmap.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  progressID: number;

  @Column({ type: 'float', default: 0 })
  percentage: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Roadmap)
  roadmap: Roadmap;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
