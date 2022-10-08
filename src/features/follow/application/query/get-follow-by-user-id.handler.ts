import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { FollowEntityRepository } from '../../db/follow-entity.repository';
import { FollowRepository } from '../../../../domain/follow.repository';
import { GetFollowByUserIdQuery } from './get-follow-by-user-id.query';
import { GetFollowByUserIdResponse } from '../../dto/response/get-follow-by-user-id-response-dto';

@QueryHandler(GetFollowByUserIdQuery)
export class GetFollowByUserIdHandler
  implements IQueryHandler<GetFollowByUserIdQuery>
{
  private readonly followRepository: FollowRepository;

  constructor(connection: Connection) {
    this.followRepository = connection.getCustomRepository(
      FollowEntityRepository,
    );
  }

  async execute(
    query: GetFollowByUserIdQuery,
  ): Promise<GetFollowByUserIdResponse> {
    const { userId } = query;

    const follow = await this.followRepository.findByUserId(userId);

    return new GetFollowByUserIdResponse(follow);
  }
}
