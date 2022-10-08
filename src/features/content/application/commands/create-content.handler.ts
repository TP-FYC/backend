import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ContentEntityRepository } from '../../db/content-entity.repository';
import { ContentRepository } from '../../../../domain/content.repository';
import { Connection } from 'typeorm';
import { CreateContentCommand } from './create-content.command';
import { Content } from '../../../../infrastructure/database/model/content.entity';
import { User } from '../../../../infrastructure/database/model/user.entity';
import { ContentType } from '../../../../infrastructure/database/model/enums/content-type';
import { Notification } from '../../../../infrastructure/database/model/notification.entity';
import { NotificationType } from '../../../../infrastructure/database/model/enums/notification-type';
import { NotificationRepository } from '../../../../domain/notification.repository';
import { NotificationEntityRepository } from '../../../notifications/db/notification-entity.repository';
import { ContentNotFoundException } from '../../../../shared/exceptions/content-not-found.exception';
import { Program } from '../../../../infrastructure/database/model/program.entity';

@CommandHandler(CreateContentCommand)
export class CreateContentHandler
  implements ICommandHandler<CreateContentCommand>
{
  private readonly contentRepository: ContentRepository;
  private readonly notificationRepository: NotificationRepository;

  constructor(connection: Connection) {
    this.contentRepository = connection.getCustomRepository(
      ContentEntityRepository,
    );
    this.notificationRepository = connection.getCustomRepository(
      NotificationEntityRepository,
    );
  }

  async execute(command: CreateContentCommand): Promise<void> {
    const content = new Content();
    content.title = command.title;
    content.content = command.content;
    content.contentType = command.contentType;
    if (command.parentId != null) {
      const parent = new Content();
      parent.id = command.parentId;
      content.parent = parent;
    }
    if (command.creatorId != null) {
      const creator = new User();
      creator.id = command.creatorId;
      content.creator = creator;
    }

    if (command.stdin && command.stdout) {
      const program = new Program();
      program.stdin = command.stdin;
      program.stdout = command.stdout;
      content.program = program;
    }

    await this.contentRepository.addContent(content);

    if (content.contentType === ContentType.COMMENT) {
      await this.sendNotification(command);
    }
  }

  private async sendNotification(command: CreateContentCommand) {
    const foundContent = await this.contentRepository.findById(
      command.parentId,
    );

    if (!foundContent) {
      throw new ContentNotFoundException();
    }

    const contentLinked = new Content();
    contentLinked.id = command.parentId;

    const user = new User();
    user.id = command.creatorId;

    const notification = new Notification();
    notification.content_linked = contentLinked;
    notification.user_recipient = foundContent.creator_id;
    notification.user_linked = user;
    notification.notification_type = NotificationType.COMMENT;
    await this.notificationRepository.addNotification(notification);
  }
}
