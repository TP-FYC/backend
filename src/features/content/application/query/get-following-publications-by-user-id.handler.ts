import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ContentEntityRepository } from '../../db/content-entity.repository';
import { ContentRepository } from '../../../../domain/content.repository';
import { Connection } from 'typeorm';
import { GetFollowingPublicationsByUserIdQuery } from './get-following-publications-by-user-id.query';
import { PubicationResponse } from '../../dto/response/publication-response-dto';
import { UserReactToContentRepository } from 'src/domain/user-react-to-content.repository';
import { UserReactToContentEntityRepository } from 'src/features/user-react-to-content/db/user-react-to-content-entity.repository';

@QueryHandler(GetFollowingPublicationsByUserIdQuery)
export class GetFollowingPublicationsByUserIdHandler
  implements IQueryHandler<GetFollowingPublicationsByUserIdQuery>
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
    query: GetFollowingPublicationsByUserIdQuery,
  ): Promise<PubicationResponse[]> {
    const { userId } = query;

    const publications = await this.repository.findFollowingsByUserId(userId);
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
