import { GetContentByIdRequest } from '../../dto/request/get-content-by-id-request.dto';

export class GetContentByIdQuery {
  public readonly contentId: string;
  constructor(contentId: string) {
    this.contentId = contentId;
  }
  public static of(
    getPublicationsByIdRequest: GetContentByIdRequest,
  ): GetContentByIdQuery {
    const { contentId } = getPublicationsByIdRequest;
    return new GetContentByIdQuery(contentId);
  }
}
