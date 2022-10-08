import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ContentType } from './enums/content-type';
import { Program } from './program.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: false })
  content: string;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ContentType,
    default: ContentType.PUBLICATION,
    name: 'content_type',
  })
  contentType: ContentType;

  @ManyToOne(() => Content, (content) => content.id)
  @JoinColumn({ name: 'parent_id' })
  parent: Content;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @OneToOne(() => Program, (program) => program.id, { cascade: true })
  @JoinColumn({ name: 'program_id' })
  program: Program;
}
