import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowEntityRepository } from '../../db/follow-entity.repository';
import { Connection } from 'typeorm';
import { DeleteFollowCommand } from './delete-follow.command';
import { FollowRepository } from '../../../../domain/follow.repository';
import { User } from '../../../../infrastructure/database/model/user.entity';

@CommandHandler(DeleteFollowCommand)
export class DeleteFollowHandler
  implements ICommandHandler<DeleteFollowCommand>
{
  private readonly followRepository: FollowRepository;

  constructor(connection: Connection) {
    this.followRepository = connection.getCustomRepository(
      FollowEntityRepository,
    );
  }

  async execute(command: DeleteFollowCommand): Promise<void> {
    const user = new User();
    user.id = command.userId;

    const follower = new User();
    follower.id = command.followerId;

    await this.followRepository.deleteFollow(user, follower);
  }
}
