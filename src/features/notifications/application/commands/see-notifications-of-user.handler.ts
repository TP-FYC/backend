import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotificationEntityRepository } from '../../db/notification-entity.repository';
import { NotificationRepository } from '../../../../domain/notification.repository';
import { Connection } from 'typeorm';
import { UserRepository } from '../../../../domain/user.repository';
import { UserEntityRepository } from '../../../../infrastructure/database/shared-repository/user-entity.repository';
import { SeeNotificationsOfUserCommand } from './see-notifications-of-user.command';
import { UserNotFoundException } from '../../../../shared/exceptions/user-not-found.exception';

@CommandHandler(SeeNotificationsOfUserCommand)
export class SeeNotificationsOfUserHandler
  implements ICommandHandler<SeeNotificationsOfUserCommand>
{
  private readonly notificationRepository: NotificationRepository;
  private readonly userRepository: UserRepository;

  constructor(connection: Connection) {
    this.notificationRepository = connection.getCustomRepository(
      NotificationEntityRepository,
    );
    this.userRepository = connection.getCustomRepository(UserEntityRepository);
  }

  async execute(command: SeeNotificationsOfUserCommand): Promise<void> {
    const foundUser = await this.userRepository.findById(command.userId);
    if (foundUser == null) {
      throw new UserNotFoundException();
    }

    const foundNotifications =
      await this.notificationRepository.findNotSeenNotificationsByUserId(
        command.userId,
      );

    for (const notification of foundNotifications) {
      notification.is_seen = true;
      await this.notificationRepository.updateNotification(notification);
    }
  }
}
