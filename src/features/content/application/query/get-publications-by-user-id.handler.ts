import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ContentEntityRepository } from '../../db/content-entity.repository';
import { GetPublicationsByUserIdQuery } from './get-publications-by-user-id.query';
import { ContentRepository } from '../../../../domain/content.repository';
import { Connection } from 'typeorm';
import { UserReactToContentRepository } from '../../../../domain/user-react-to-content.repository';
import { UserReactToContentEntityRepository } from '../../../user-react-to-content/db/user-react-to-content-entity.repository';
import { PubicationResponse } from '../../dto/response/publication-response-dto';

@QueryHandler(GetPublicationsByUserIdQuery)
export class GetPublicationsByUserIdHandler
  implements IQueryHandler<GetPublicationsByUserIdQuery>
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
    query: GetPublicationsByUserIdQuery,
  ): Promise<PubicationResponse[]> {
    const { userId } = query;

    const publications = await this.repository.findPublicationsByUserId(userId);
    const publicationsToReturn = publications.map(async (publication) => {
      return new PubicationResponse(
        publication.id,
        publication.title,
        publication.content,
        publication.user_description,
        publication.creator_id,
        publication.content_type,
        publication.created_at,
        publication.parent_id,
        `${publication.firstname} ${publication.lastname}`,
        await this.userReactToContentRepository.countLike(publication.id),
        await this.userReactToContentRepository.countDislike(publication.id),
        await this.repository.countResponseByContentId(publication.id),
        publication.stdin,
        publication.stdout,
      );
    });
    return Promise.all(publicationsToReturn);
  }
}
