import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { GetUsersWhoReactedToContentQuery } from './get-users-who-reacted-to-content.query';
import { GetUsersWhoReactedToContentResponse } from '../../dto/response/get-users-who-reacted-to-content-response-dto';
import { UserReactToContentRepository } from '../../../../domain/user-react-to-content.repository';
import { UserReactToContentEntityRepository } from '../../db/user-react-to-content-entity.repository';

@QueryHandler(GetUsersWhoReactedToContentQuery)
export class GetUsersWhoReactedToContentHandler
  implements ICommandHandler<GetUsersWhoReactedToContentQuery>
{
  private readonly repository: UserReactToContentRepository;

  constructor(connection: Connection) {
    this.repository = connection.getCustomRepository(
      UserReactToContentEntityRepository,
    );
  }

  async execute(
    query: GetUsersWhoReactedToContentQuery,
  ): Promise<GetUsersWhoReactedToContentResponse> {
    const { contentId } = query;

    const users = await this.repository.findUsersWhoReactedToContent(contentId);

    return new GetUsersWhoReactedToContentResponse(users);
  }
}
