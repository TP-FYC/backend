import { ReactionType } from 'src/infrastructure/database/model/enums/reaction-type';
import { EntityRepository, Repository } from 'typeorm';
import { UserReactToContentRepository } from '../../../domain/user-react-to-content.repository';
import { UserReactToContent } from '../../../infrastructure/database/model/user-react-to-content.entity';
import { User } from '../../../infrastructure/database/model/user.entity';

@EntityRepository(UserReactToContent)
export class UserReactToContentEntityRepository
  extends Repository<UserReactToContent>
  implements UserReactToContentRepository
{
  countLike(contentId: string): Promise<number> {
    return this.count({
      content_id: contentId,
      reaction_type: ReactionType.LIKE,
    });
  }
  countDislike(contentId: string): Promise<number> {
    return this.count({
      content_id: contentId,
      reaction_type: ReactionType.DISLIKE,
    });
  }
  async updateReaction(userReactToContent: UserReactToContent): Promise<void> {
    await this.update(
      {
        user_id: userReactToContent.user_id,
        content_id: userReactToContent.content_id,
      },
      { reaction_type: userReactToContent.reaction_type },
    );
  }
  findByUserIdAndContentId(
    userId: string,
    contentId: string,
  ): Promise<UserReactToContent> {
    return this.findOne({ user_id: userId, content_id: contentId });
  }
  async addReactionToContent(
    userReactToContent: UserReactToContent,
  ): Promise<void> {
    await this.save(userReactToContent);
  }

  async deleteReactionToContent(
    userReactToContent: UserReactToContent,
  ): Promise<void> {
    await this.delete(userReactToContent);
  }

  async deleteReactionsByContentId(contentId: string): Promise<void> {
    await this.delete({ content_id: contentId });
  }

  findUsersWhoReactedToContent(contentId: string): Promise<User[]> {
    return this.manager
      .createQueryBuilder(User, 'users')
      .select('users.*')
      .innerJoin(
        UserReactToContent,
        'userReactToContent',
        'users.id = userReactToContent.user_id',
      )
      .where('userReactToContent.content_id = :contentId', {
        contentId: contentId,
      })
      .getRawMany();
  }
}
