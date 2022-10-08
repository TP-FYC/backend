import { UpdateContentRequest } from '../../dto/request/update-content-request.dto';

export class UpdateContentCommand {
  public readonly contentId: string;
  public readonly title: string;
  public readonly content: string;

  constructor(contentId: string, title: string, content: string) {
    this.contentId = contentId;
    this.title = title;
    this.content = content;
  }

  public static of(
    updateContentRequest: UpdateContentRequest,
  ): UpdateContentCommand {
    const { contentId, title, content } = updateContentRequest;
    return new UpdateContentCommand(contentId, title, content);
  }
}
