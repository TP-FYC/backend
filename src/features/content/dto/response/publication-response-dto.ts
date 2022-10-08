export class PubicationResponse {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly userDescription: string;
  readonly contentType: string;
  readonly createdAt: Date;
  readonly creatorId: string;
  readonly parentId: string;
  readonly userImage: string;
  readonly username: string;
  readonly numberOfLikes: number;
  readonly numberOfDislikes: number;
  readonly numberOfComments: number;
  readonly stdin: string | null;
  readonly stdout: string | null;

  constructor(
    id: string,
    title: string,
    content: string,
    userDescription: string,
    creatorId: string,
    contentType: string,
    createdAt: Date,
    parentId: string,
    userImage: string,
    username: string,
    numberOfLikes: number,
    numberOfDislikes: number,
    numberOfComments: number,
    stdin: string | null = null,
    stdout: string | null = null,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userDescription = userDescription;
    this.creatorId = creatorId;
    this.contentType = contentType;
    this.createdAt = createdAt;
    this.parentId = parentId;
    this.userImage = userImage;
    this.username = username;
    this.numberOfLikes = numberOfLikes;
    this.numberOfDislikes = numberOfDislikes;
    this.numberOfComments = numberOfComments;
    this.stdin = stdin;
    this.stdout = stdout;
  }
}
