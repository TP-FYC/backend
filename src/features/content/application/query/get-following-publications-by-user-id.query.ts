import { GetFollowingPublicationsByUserIdRequest } from '../../dto/request/get-following-publications-by-user-id-request.dto';

export class GetFollowingPublicationsByUserIdQuery {
  public readonly userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
  public static of(
    getFollowingPublicationsByUserIdRequest: GetFollowingPublicationsByUserIdRequest,
  ): GetFollowingPublicationsByUserIdQuery {
    const { userId } = getFollowingPublicationsByUserIdRequest;
    return new GetFollowingPublicationsByUserIdQuery(userId);
  }
}
