import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserReactToContentEntityRepository } from '../../db/user-react-to-content-entity.repository';
import { UserReactToContentRepository } from '../../../../domain/user-react-to-content.repository';
import { Connection } from 'typeorm';
import { DeleteReactionToContentCommand } from './delete-reaction-to-content.command';
import { UserReactToContent } from '../../../../infrastructure/database/model/user-react-to-content.entity';

@CommandHandler(DeleteReactionToContentCommand)
export class DeleteReactionToContentHandler
  implements ICommandHandler<DeleteReactionToContentCommand>
{
  private readonly repository: UserReactToContentRepository;

  constructor(connection: Connection) {
    this.repository = connection.getCustomRepository(
      UserReactToContentEntityRepository,
    );
  }

  async execute(command: DeleteReactionToContentCommand): Promise<void> {
    const userReactToContent = new UserReactToContent();
    userReactToContent.user_id = command.userId;
    userReactToContent.content_id = command.contentId;

    await this.repository.deleteReactionToContent(userReactToContent);
  }
}
