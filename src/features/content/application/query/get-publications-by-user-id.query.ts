import { GetPublicationsByUserIdRequest } from '../../dto/request/get-publications-by-user-id-request.dto';

export class GetPublicationsByUserIdQuery {
  public readonly userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
  public static of(
    getPublicationsByUserIdRequest: GetPublicationsByUserIdRequest,
  ): GetPublicationsByUserIdQuery {
    const { userId } = getPublicationsByUserIdRequest;
    return new GetPublicationsByUserIdQuery(userId);
  }
}
