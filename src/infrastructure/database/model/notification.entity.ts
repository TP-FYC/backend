import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Content } from './content.entity';
import { NotificationType } from './enums/notification-type';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_hour: Date;

  @Column({ default: false })
  is_seen: boolean;

  @Column({
    nullable: false,
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.LIKE,
  })
  notification_type: NotificationType;

  @ManyToOne(() => Content, (content) => content.id)
  @JoinColumn({ name: 'content_linked_id' })
  content_linked: Content;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_recipient_id' })
  user_recipient: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_linked_id' })
  user_linked: User;
}
