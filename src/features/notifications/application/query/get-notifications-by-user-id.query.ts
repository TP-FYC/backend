import { GetNotificationByUserIdRequest } from '../../dto/request/get-notifications-by-user-id-request.dto';

export class GetNotificationByUserIdQuery {
  public readonly userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
  public static of(
    getPublicationsByUserIdRequest: GetNotificationByUserIdRequest,
  ): GetNotificationByUserIdQuery {
    const { userId } = getPublicationsByUserIdRequest;
    return new GetNotificationByUserIdQuery(userId);
  }
}
