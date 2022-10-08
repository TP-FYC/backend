import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowEntityRepository } from '../../db/follow-entity.repository';
import { Connection } from 'typeorm';
import { UpdateFollowCommand } from './update-follow.command';
import { FollowRepository } from '../../../../domain/follow.repository';
import { NotificationRepository } from '../../../../domain/notification.repository';
import { NotificationEntityRepository } from '../../../notifications/db/notification-entity.repository';
import { User } from '../../../../infrastructure/database/model/user.entity';
import { Notification } from '../../../../infrastructure/database/model/notification.entity';
import { NotificationType } from '../../../../infrastructure/database/model/enums/notification-type';
import { UserNotFoundException } from '../../../../shared/exceptions/user-not-found.exception';
import { UserEntityRepository } from '../../../../infrastructure/database/shared-repository/user-entity.repository';
import { UserRepository } from '../../../../domain/user.repository';
import { Status } from '../../../../infrastructure/database/model/enums/status';
import { FollowNotFoundException } from '../exception/follow-not-found.exception';

@CommandHandler(UpdateFollowCommand)
export class UpdateFollowHandler
  implements ICommandHandler<UpdateFollowCommand>
{
  private readonly followRepository: FollowRepository;
  private readonly notificationRepository: NotificationRepository;
  private readonly userRepository: UserRepository;

  constructor(connection: Connection) {
    this.followRepository = connection.getCustomRepository(
      FollowEntityRepository,
    );
    this.notificationRepository = connection.getCustomRepository(
      NotificationEntityRepository,
    );
    this.userRepository = connection.getCustomRepository(UserEntityRepository);
  }

  async execute(command: UpdateFollowCommand): Promise<void> {
    const foundUser = await this.userRepository.findById(command.userId);

    if (!foundUser) {
      throw new UserNotFoundException();
    }

    const foundFollow = await this.followRepository.findByUserAndFollowerId(
      command.userId,
      command.followerId,
    );

    if (!foundFollow) {
      throw new FollowNotFoundException();
    }

    if (foundFollow.follow_status != command.followStatus) {
      foundFollow.follow_status = command.followStatus;

      await this.followRepository.updateFollow(foundFollow);

      await this.sendNotification(command, foundUser);
    }
  }

  private async sendNotification(
    command: UpdateFollowCommand,
    foundUser: User,
  ) {
    const follower = new User();
    follower.id = command.followerId;

    const notification = new Notification();
    notification.user_recipient = follower;
    notification.user_linked = foundUser;
    if (command.followStatus == Status.ACCEPTED) {
      notification.notification_type = NotificationType.FOLLOW_ACCEPTED;
    } else {
      notification.notification_type = NotificationType.FOLLOW_REFUSED;
    }
    await this.notificationRepository.addNotification(notification);

    await this.notificationRepository.deleteFollowDemandNotificationByUserAndFollower(
      foundUser,
      follower,
    );
  }
}
