import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowEntityRepository } from '../../db/follow-entity.repository';
import { Connection } from 'typeorm';
import { CreateFollowCommand } from './create-follow.command';
import { User } from '../../../../infrastructure/database/model/user.entity';
import { Confidentiality } from '../../../../infrastructure/database/model/enums/confidentiality';
import { Status } from '../../../../infrastructure/database/model/enums/status';
import { Follow } from '../../../../infrastructure/database/model/follow.entity';
import { UserRepository } from '../../../../domain/user.repository';
import { UserEntityRepository } from '../../../../infrastructure/database/shared-repository/user-entity.repository';
import { FollowRepository } from '../../../../domain/follow.repository';
import { UserNotFoundException } from '../../../../shared/exceptions/user-not-found.exception';
import { AlreadyFollowedException } from '../exception/already-followed.exception';
import { CantFollowYourselfException } from '../exception/cant-follow-yourself.exception';
import { Notification } from '../../../../infrastructure/database/model/notification.entity';
import { NotificationType } from '../../../../infrastructure/database/model/enums/notification-type';
import { NotificationEntityRepository } from '../../../notifications/db/notification-entity.repository';
import { NotificationRepository } from '../../../../domain/notification.repository';

@CommandHandler(CreateFollowCommand)
export class CreateFollowHandler
  implements ICommandHandler<CreateFollowCommand>
{
  private readonly followRepository: FollowRepository;
  private readonly userRepository: UserRepository;
  private readonly notificationRepository: NotificationRepository;

  constructor(connection: Connection) {
    this.followRepository = connection.getCustomRepository(
      FollowEntityRepository,
    );
    this.notificationRepository = connection.getCustomRepository(
      NotificationEntityRepository,
    );
    this.userRepository = connection.getCustomRepository(UserEntityRepository);
  }

  async execute(command: CreateFollowCommand): Promise<void> {
    if (command.followerId === command.userId) {
      throw new CantFollowYourselfException();
    }

    const foundFollow = await this.followRepository.findByUserAndFollowerId(
      command.userId,
      command.followerId,
    );
    if (foundFollow != null) {
      throw new AlreadyFollowedException();
    }

    const foundUser = await this.userRepository.findById(command.userId);

    if (!foundUser) {
      throw new UserNotFoundException();
    }

    const follower = new User();
    follower.id = command.followerId;

    const user = new User();
    user.id = command.userId;

    const follow = new Follow();
    follow.follower = follower;
    follow.user = user;
    if (foundUser.confidentiality === Confidentiality.PUBLIC) {
      follow.follow_status = Status.ACCEPTED;
    } else {
      follow.follow_status = Status.PENDING_INVIT;
    }

    await this.followRepository.addFollow(follow);

    await this.sendNotification(command, foundUser);
  }

  private async sendNotification(
    command: CreateFollowCommand,
    foundUser: User,
  ) {
    const follower = new User();
    follower.id = command.followerId;

    const notification = new Notification();
    notification.user_recipient = foundUser;
    notification.user_linked = follower;
    if (foundUser.confidentiality === Confidentiality.PUBLIC) {
      notification.notification_type = NotificationType.FOLLOW_ACCEPTED;
    } else {
      notification.notification_type = NotificationType.FOLLOW_DEMAND;
    }
    await this.notificationRepository.addNotification(notification);
  }
}
