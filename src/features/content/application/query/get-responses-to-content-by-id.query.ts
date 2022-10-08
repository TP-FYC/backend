import { GetResponsesToContentByIdRequest } from '../../dto/request/get-responses-to-content-by-id-request.dto';

export class GetResponsesToContentByIdQuery {
  public readonly contentId: string;
  constructor(contentId: string) {
    this.contentId = contentId;
  }
  public static of(
    getResponsesToContentByIdRequest: GetResponsesToContentByIdRequest,
  ): GetResponsesToContentByIdQuery {
    const { contentId } = getResponsesToContentByIdRequest;
    return new GetResponsesToContentByIdQuery(contentId);
  }
}
