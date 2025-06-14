import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column()
  @Index({ unique: true })
  phone: string;

  @Column({ default: '' })
  projectType: string;

  @Column({ default: '' })
  location: string;

  @Column({ default: 'name' })
  step: string;

  @CreateDateColumn()
  createdAt: Date;
}
