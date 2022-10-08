import { DeleteFollowRequest } from '../../dto/request/delete-follow-request.dto';

export class DeleteFollowCommand {
  public readonly followerId: string;
  public readonly userId: string;

  constructor(followerId: string, userId: string) {
    this.followerId = followerId;
    this.userId = userId;
  }

  public static of(
    deleteFollowRequest: DeleteFollowRequest,
  ): DeleteFollowCommand {
    const { followerId, userId } = deleteFollowRequest;
    return new DeleteFollowCommand(followerId, userId);
  }
}
