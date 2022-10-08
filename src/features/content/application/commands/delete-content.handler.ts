import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ContentEntityRepository } from '../../db/content-entity.repository';
import { ContentRepository } from '../../../../domain/content.repository';
import { Connection } from 'typeorm';
import { DeleteContentCommand } from './delete-content.command';
import { UserReactToContentEntityRepository } from '../../../user-react-to-content/db/user-react-to-content-entity.repository';
import { NotificationRepository } from '../../../../domain/notification.repository';
import { NotificationEntityRepository } from '../../../notifications/db/notification-entity.repository';
import { Content } from '../../../../infrastructure/database/model/content.entity';
import { UserReactToContentRepository } from '../../../../domain/user-react-to-content.repository';

@CommandHandler(DeleteContentCommand)
export class DeleteContentHandler
  implements ICommandHandler<DeleteContentCommand>
{
  private readonly contentRepository: ContentRepository;
  private readonly userReactToContentRepository: UserReactToContentRepository;
  private readonly notificationRepository: NotificationRepository;

  constructor(connection: Connection) {
    this.contentRepository = connection.getCustomRepository(
      ContentEntityRepository,
    );
    this.userReactToContentRepository = connection.getCustomRepository(
      UserReactToContentEntityRepository,
    );
    this.notificationRepository = connection.getCustomRepository(
      NotificationEntityRepository,
    );
  }

  async execute(command: DeleteContentCommand): Promise<void> {
    const content = new Content();
    content.id = command.contentId;

    await this.userReactToContentRepository.deleteReactionsByContentId(
      command.contentId,
    );
    await this.notificationRepository.deleteNotificationByContent(content);
    await this.contentRepository.deleteResponsesByContentId(content);
    await this.contentRepository.deleteContent(command.contentId);
  }
}
