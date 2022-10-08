import { UpdateFollowRequest } from '../../dto/request/update-follow-request.dto';
import { Status } from '../../../../infrastructure/database/model/enums/status';

export class UpdateFollowCommand {
  public readonly followerId: string;
  public readonly userId: string;
  public readonly followStatus: Status;

  constructor(followerId: string, userId: string, followStatus: Status) {
    this.followerId = followerId;
    this.userId = userId;
    this.followStatus = followStatus;
  }

  public static of(
    updateFollowRequest: UpdateFollowRequest,
  ): UpdateFollowCommand {
    const { followerId, userId, followStatus } = updateFollowRequest;
    return new UpdateFollowCommand(followerId, userId, followStatus);
  }
}
