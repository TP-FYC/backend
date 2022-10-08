import { EntityRepository, Repository } from 'typeorm';
import { Follow } from '../../../infrastructure/database/model/follow.entity';
import { FollowRepository } from '../../../domain/follow.repository';
import { User } from '../../../infrastructure/database/model/user.entity';

@EntityRepository(Follow)
export class FollowEntityRepository
  extends Repository<Follow>
  implements FollowRepository
{
  async addFollow(follow: Follow): Promise<void> {
    await this.save(follow);
  }

  async updateFollow(follow: Follow): Promise<void> {
    await this.update(follow.id, follow);
  }

  async deleteFollow(user: User, follower: User): Promise<void> {
    await this.delete({
      follower: follower,
      user: user,
    });
  }

  findByFollowerId(followerId: string): Promise<Follow[]> {
    return this.find({
      where: [
        {
          follower: followerId,
        },
      ],
      relations: ['follower', 'user'],
    });
  }

  findByUserId(userId: string): Promise<Follow[]> {
    return this.find({
      where: [
        {
          user: userId,
        },
      ],
      relations: ['follower', 'user'],
    });
  }

  findByUserAndFollowerId(userId: string, followerId: string): Promise<Follow> {
    return this.findOne({
      where: [
        {
          user: userId,
          follower: followerId,
        },
      ],
    });
  }
}
