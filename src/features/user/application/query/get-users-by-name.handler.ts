import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { UserRepository } from '../../../../domain/user.repository';
import { UserEntityRepository } from '../../../../infrastructure/database/shared-repository/user-entity.repository';
import { GetUsersByNameResponse } from '../../dto/response/get-users-by-name-response.dto';
import { GetUsersByNameQuery } from './get-users-by-name.query';

@QueryHandler(GetUsersByNameQuery)
export class GetUsersByNameHandler
  implements ICommandHandler<GetUsersByNameQuery>
{
  private readonly userRepository: UserRepository;

  constructor(connection: Connection) {
    this.userRepository = connection.getCustomRepository(UserEntityRepository);
  }

  async execute(query: GetUsersByNameQuery): Promise<GetUsersByNameResponse> {
    const { name } = query;

    const users = await this.userRepository.findByName(name);

    return new GetUsersByNameResponse(users);
  }
}
