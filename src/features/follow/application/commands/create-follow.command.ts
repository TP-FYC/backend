import { CreateFollowRequest } from '../../dto/request/create-follow-request.dto';

export class CreateFollowCommand {
  public readonly followerId: string;
  public readonly userId: string;

  constructor(followerId: string, userId: string) {
    this.followerId = followerId;
    this.userId = userId;
  }

  public static of(
    createPublicationRequest: CreateFollowRequest,
  ): CreateFollowCommand {
    const { followerId, userId } = createPublicationRequest;
    return new CreateFollowCommand(followerId, userId);
  }
}
