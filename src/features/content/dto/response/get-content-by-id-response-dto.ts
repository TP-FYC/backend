import { Content } from '../../../../infrastructure/database/model/content.entity';

export class GetContentByIdResponse {
  constructor(content: Content) {
    this.content = content;
  }

  readonly content: Content;
}
