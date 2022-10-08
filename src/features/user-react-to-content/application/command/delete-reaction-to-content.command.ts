import { DeleteReactionToContentRequest } from '../../dto/request/delete-reaction-to-content-request.dto';

export class DeleteReactionToContentCommand {
  public readonly userId: string;
  public readonly contentId: string;

  constructor(userId: string, contentId: string) {
    this.userId = userId;
    this.contentId = contentId;
  }

  public static of(
    deleteReactionToContentRequest: DeleteReactionToContentRequest,
  ): DeleteReactionToContentCommand {
    const { userId, contentId } = deleteReactionToContentRequest;
    return new DeleteReactionToContentCommand(userId, contentId);
  }
}
