import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Roadmap } from '../../roadmaps/entities/roadmap.entity';
import { Milestone } from '../../milestone/entities/milestone.entity';
import { Progress } from '../../progress/entities/progress.entity';
import { Validation } from '../../validations/entities/validation.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
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
  @OneToMany(() => Progress, progress => progress.user)
  progress: Progress[]
  @OneToMany(() => Validation, validations => validations.user)
  validations: Progress[]


}
export default User

