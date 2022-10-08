import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ContentEntityRepository } from '../../db/content-entity.repository';
import { ContentRepository } from '../../../../domain/content.repository';
import { Connection } from 'typeorm';
import { GetResponsesToContentByIdQuery } from './get-responses-to-content-by-id.query';
import { UserReactToContentRepository } from 'src/domain/user-react-to-content.repository';
import { UserReactToContentEntityRepository } from 'src/features/user-react-to-content/db/user-react-to-content-entity.repository';
import { PubicationResponse } from '../../dto/response/publication-response-dto';

@QueryHandler(GetResponsesToContentByIdQuery)
export class GetResponsesToContentByIdHandler
  implements IQueryHandler<GetResponsesToContentByIdQuery>
{
  private readonly repository: ContentRepository;

  private readonly userReactToContentRepository: UserReactToContentRepository;
  constructor(connection: Connection) {
    this.repository = connection.getCustomRepository(ContentEntityRepository);
    this.userReactToContentRepository = connection.getCustomRepository(
      UserReactToContentEntityRepository,
    );
  }

  async execute(
    query: GetResponsesToContentByIdQuery,
  ): Promise<PubicationResponse[]> {
    const { contentId } = query;

    const contents = await this.repository.findResponsesByContentId(contentId);
    const publicationsToReturn = contents.map(async (content) => {
      return new PubicationResponse(
        content.id,
        content.title,
        content.content,
        content.user_description,
        content.creator_id,
        content.content_type,
        content.created_at,
        content.parent_id,
        content.principal_picture_url,
        `${content.firstname} ${content.lastname}`,
        await this.userReactToContentRepository.countLike(content.id),
        await this.userReactToContentRepository.countDislike(content.id),
        await this.repository.countResponseByContentId(content.id),
        content.stdin,
        content.stdout,
      );
    });
    return Promise.all(publicationsToReturn);
  }
}
