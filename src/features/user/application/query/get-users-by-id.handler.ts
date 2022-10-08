import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { UserRepository } from '../../../../domain/user.repository';
import { UserEntityRepository } from '../../../../infrastructure/database/shared-repository/user-entity.repository';
import { GetUsersByIdQuery } from './get-users-by-id.query';
import { GetUsersByIdResponse } from '../../dto/response/get-users-by-id-response.dto';

@QueryHandler(GetUsersByIdQuery)
export class GetUsersByIdHandler implements ICommandHandler<GetUsersByIdQuery> {
  private readonly userRepository: UserRepository;

  constructor(connection: Connection) {
    this.userRepository = connection.getCustomRepository(UserEntityRepository);
  }

  async execute(query: GetUsersByIdQuery): Promise<GetUsersByIdResponse> {
    const { name } = query;

    const users = await this.userRepository.findById(name);

    return new GetUsersByIdResponse(users);
  }
}
