import { Follow } from '../infrastructure/database/model/follow.entity';
import { User } from '../infrastructure/database/model/user.entity';

export interface FollowRepository {
  addFollow(follow: Follow): Promise<void>;

  updateFollow(follow: Follow): Promise<void>;

  deleteFollow(user: User, follower: User): Promise<void>;

  findByFollowerId(followerId: string): Promise<Follow[]>;

  findByUserId(userId: string): Promise<Follow[]>;

  findByUserAndFollowerId(userId: string, followerId: string): Promise<Follow>;
}
