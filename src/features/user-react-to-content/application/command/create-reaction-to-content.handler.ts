import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserReactToContentEntityRepository } from '../../db/user-react-to-content-entity.repository';
import { UserReactToContentRepository } from '../../../../domain/user-react-to-content.repository';
import { Connection } from 'typeorm';
import { CreateReactionToContentCommand } from './create-reaction-to-content.command';
import { UserReactToContent } from '../../../../infrastructure/database/model/user-react-to-content.entity';
import { Notification } from '../../../../infrastructure/database/model/notification.entity';
import { NotificationRepository } from '../../../../domain/notification.repository';
import { NotificationEntityRepository } from '../../../notifications/db/notification-entity.repository';
import { ContentEntityRepository } from '../../../content/db/content-entity.repository';
import { ReactionType } from '../../../../infrastructure/database/model/enums/reaction-type';
import { NotificationType } from '../../../../infrastructure/database/model/enums/notification-type';
import { User } from '../../../../infrastructure/database/model/user.entity';
import { Content } from '../../../../infrastructure/database/model/content.entity';
import { ContentRepository } from '../../../../domain/content.repository';
import { ContentNotFoundException } from '../../../../shared/exceptions/content-not-found.exception';

@CommandHandler(CreateReactionToContentCommand)
export class CreateReactionToContentHandler
  implements ICommandHandler<CreateReactionToContentCommand>
{
  private readonly userReactToContentRepository: UserReactToContentRepository;
  private readonly contentRepository: ContentRepository;
  private readonly notificationRepository: NotificationRepository;

  constructor(connection: Connection) {
    this.userReactToContentRepository = connection.getCustomRepository(
      UserReactToContentEntityRepository,
    );
    this.contentRepository = connection.getCustomRepository(
      ContentEntityRepository,
    );
    this.notificationRepository = connection.getCustomRepository(
      NotificationEntityRepository,
    );
  }

  async execute(command: CreateReactionToContentCommand): Promise<void> {
    const reaction =
      await this.userReactToContentRepository.findByUserIdAndContentId(
        command.userId,
        command.contentId,
      );
    if (reaction) {
      reaction.reaction_type = ReactionType[command.reactionType];
      this.userReactToContentRepository.updateReaction(reaction);
      return;
    }
    const userReactToContent = new UserReactToContent();
    userReactToContent.user_id = command.userId;
    userReactToContent.content_id = command.contentId;
    userReactToContent.reaction_type = ReactionType[command.reactionType];

    await this.userReactToContentRepository.addReactionToContent(
      userReactToContent,
    );

    await this.sendNotification(command);
  }

  private async sendNotification(command: CreateReactionToContentCommand) {
    const foundContent = await this.contentRepository.findById(
      command.contentId,
    );

    if (!foundContent) {
      throw new ContentNotFoundException();
    }

    const user = new User();
    user.id = command.userId;

    const content = new Content();
    content.id = command.contentId;

    const notification = new Notification();
    notification.content_linked = content;
    notification.user_recipient = foundContent.creator_id;
    notification.user_linked = user;
    if (command.reactionType === ReactionType.LIKE) {
      notification.notification_type = NotificationType.LIKE;
    } else {
      notification.notification_type = NotificationType.DISLIKE;
    }
    await this.notificationRepository.addNotification(notification);
  }
}
