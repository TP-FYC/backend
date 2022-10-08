import { CreateReactionToContentRequest } from '../../dto/request/create-reaction-to-content-request.dto';

export class CreateReactionToContentCommand {
  public readonly userId: string;
  public readonly contentId: string;
  public readonly reactionType: string;

  constructor(userId: string, contentId: string, reactionType: string) {
    this.userId = userId;
    this.contentId = contentId;
    this.reactionType = reactionType;
  }

  public static of(
    createReactionToContentRequest: CreateReactionToContentRequest,
  ): CreateReactionToContentCommand {
    const { userId, contentId, reactionType } = createReactionToContentRequest;
    return new CreateReactionToContentCommand(userId, contentId, reactionType);
  }
}
