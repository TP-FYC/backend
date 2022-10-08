import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { ContentEntityRepository } from '../../db/content-entity.repository';
import { ContentRepository } from '../../../../domain/content.repository';
import { GetContentByIdQuery } from './get-content-by-id.query';
import { UserReactToContentRepository } from 'src/domain/user-react-to-content.repository';
import { PubicationResponse } from '../../dto/response/publication-response-dto';
import { UserReactToContentEntityRepository } from 'src/features/user-react-to-content/db/user-react-to-content-entity.repository';

@QueryHandler(GetContentByIdQuery)
export class GetContentByIdHandler
  implements IQueryHandler<GetContentByIdQuery>
{
  private readonly repository: ContentRepository;
  private readonly userReactToContentRepository: UserReactToContentRepository;

  constructor(connection: Connection) {
    this.repository = connection.getCustomRepository(ContentEntityRepository);
    this.userReactToContentRepository = connection.getCustomRepository(
      UserReactToContentEntityRepository,
    );
  }

  async execute(query: GetContentByIdQuery): Promise<PubicationResponse> {
    const { contentId } = query;

    const content = await this.repository.findById(contentId);

    return new PubicationResponse(
      content.id,
      content.title,
      content.content,
      content.user_description,
      content.creator_id,
      content.content_type,
      content.created_at,
      content.parent_id,
      `${content.firstname} ${content.lastname}`,
      await this.userReactToContentRepository.countLike(content.id),
      await this.userReactToContentRepository.countDislike(content.id),
      await this.repository.countResponseByContentId(content.id),
      content.stdin,
      content.stdout,
    );
  }
}
