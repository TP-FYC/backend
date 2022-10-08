import { GetUsersWhoReactedToContentRequest } from '../../dto/request/get-users-who-reacted-to-content-request-dto';

export class GetUsersWhoReactedToContentQuery {
  public readonly contentId: string;
  constructor(contentId: string) {
    this.contentId = contentId;
  }
  public static of(
    getUsersWhoReactedToContentRequest: GetUsersWhoReactedToContentRequest,
  ): GetUsersWhoReactedToContentQuery {
    const { contentId } = getUsersWhoReactedToContentRequest;
    return new GetUsersWhoReactedToContentQuery(contentId);
  }
}
