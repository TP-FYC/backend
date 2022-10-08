import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { FollowEntityRepository } from '../../db/follow-entity.repository';
import { GetFollowByFollowerIdQuery } from './get-follow-by-follower-id.query';
import { GetFollowByFollowerIdResponse } from '../../dto/response/get-follow-by-follower-id-response-dto';
import { FollowRepository } from '../../../../domain/follow.repository';

@QueryHandler(GetFollowByFollowerIdQuery)
export class GetFollowByFollowerIdHandler
  implements IQueryHandler<GetFollowByFollowerIdQuery>
{
  private readonly repository: FollowRepository;

  constructor(connection: Connection) {
    this.repository = connection.getCustomRepository(FollowEntityRepository);
  }

  async execute(
    query: GetFollowByFollowerIdQuery,
  ): Promise<GetFollowByFollowerIdResponse> {
    const { followerId } = query;

    const follow = await this.repository.findByFollowerId(followerId);

    return new GetFollowByFollowerIdResponse(follow);
  }
}
