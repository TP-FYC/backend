import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  stdin: string;

  @Column({ nullable: false })
  stdout: string;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
