import { GetFollowByUserIdRequest } from '../../dto/request/get-follow-by-user-id-request.dto';

export class GetFollowByUserIdQuery {
  public readonly userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
  public static of(
    getFollowByUserIdRequest: GetFollowByUserIdRequest,
  ): GetFollowByUserIdQuery {
    const { userId } = getFollowByUserIdRequest;
    return new GetFollowByUserIdQuery(userId);
  }
}
