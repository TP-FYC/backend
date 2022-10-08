import { UserReactToContent } from '../infrastructure/database/model/user-react-to-content.entity';
import { User } from '../infrastructure/database/model/user.entity';

export interface UserReactToContentRepository {
  addReactionToContent(userReactToContent: UserReactToContent): Promise<void>;

  updateReaction(userReactToContent: UserReactToContent): Promise<void>;

  deleteReactionToContent(
    userReactToContent: UserReactToContent,
  ): Promise<void>;

  deleteReactionsByContentId(contentId: string): Promise<void>;

  findUsersWhoReactedToContent(contentId: string): Promise<User[]>;
  findByUserIdAndContentId(
    userId: string,
    contentId: string,
  ): Promise<UserReactToContent>;
  countLike(contentId: string): Promise<number>;
  countDislike(contentId: string): Promise<number>;
}
