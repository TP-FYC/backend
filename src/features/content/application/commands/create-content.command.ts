import { CreateContentRequest } from '../../dto/request/create-content-request.dto';
import { ContentType } from '../../../../infrastructure/database/model/enums/content-type';

export class CreateContentCommand {
  public readonly title: string;
  public readonly content: string;
  public readonly contentType: ContentType;
  public readonly parentId: string;
  public readonly creatorId: string;
  public readonly stdin: string;
  public readonly stdout: string;

  constructor(
    title: string,
    content: string,
    contentType: ContentType,
    parentId: string,
    creatorId: string,
    stdin: string,
    stdout: string,
  ) {
    this.title = title;
    this.content = content;
    this.contentType = contentType;
    this.parentId = parentId;
    this.creatorId = creatorId;
    this.stdin = stdin;
    this.stdout = stdout;
  }

  public static of(
    createPublicationRequest: CreateContentRequest,
  ): CreateContentCommand {
    const {
      title,
      content,
      contentType,
      parentId,
      creatorId,
      stdin,
      stdout,
    } = createPublicationRequest;
    return new CreateContentCommand(
      title,
      content,
      contentType,
      parentId,
      creatorId,
      stdin,
      stdout,
    );
  }
}
