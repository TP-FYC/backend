import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Content } from './content.entity';
import { User } from './user.entity';
import { ReactionType } from './enums/reaction-type';

@Entity()
export class UserReactToContent {
  @PrimaryColumn()
  @ManyToOne(() => Content)
  @JoinColumn({ name: 'content_id' })
  content_id: string;

  @PrimaryColumn()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ReactionType,
    default: ReactionType.LIKE,
  })
  reaction_type: ReactionType;
}
