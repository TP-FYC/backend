import { GetFollowByFollowerIdRequest } from '../../dto/request/get-follow-by-follower-id-request.dto';

export class GetFollowByFollowerIdQuery {
  public readonly followerId: string;
  constructor(followerId: string) {
    this.followerId = followerId;
  }
  public static of(
    getFollowByFollowerIdRequest: GetFollowByFollowerIdRequest,
  ): GetFollowByFollowerIdQuery {
    const { followerId } = getFollowByFollowerIdRequest;
    return new GetFollowByFollowerIdQuery(followerId);
  }
}
