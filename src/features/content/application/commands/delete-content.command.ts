import { DeleteContentRequest } from '../../dto/request/delete-content-request.dto';

export class DeleteContentCommand {
  public readonly contentId: string;

  constructor(contentId: string) {
    this.contentId = contentId;
  }

  public static of(
    deleteContentRequest: DeleteContentRequest,
  ): DeleteContentCommand {
    const { contentId } = deleteContentRequest;
    return new DeleteContentCommand(contentId);
  }
}
