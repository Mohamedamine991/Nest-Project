import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Milestone } from '../../milestone/entities/milestone.entity';

@Entity()
export class Roadmap {
<<<<<<< HEAD
  @PrimaryColumn()
=======
  @PrimaryColumn()  
>>>>>>> 381a82536d776b319e7267d1c1a77ac21f6868a4
  roadmapID: string;

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

  @ManyToMany(() => User, user => user.roadmaps)
  @JoinTable()
  users: User[];
}

