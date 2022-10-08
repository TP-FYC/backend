import { EntityRepository, Repository } from 'typeorm';
import { NotificationRepository } from '../../../domain/notification.repository';
import { Notification } from '../../../infrastructure/database/model/notification.entity';
import { Content } from '../../../infrastructure/database/model/content.entity';
import { User } from '../../../infrastructure/database/model/user.entity';
import { NotificationType } from '../../../infrastructure/database/model/enums/notification-type';

@EntityRepository(Notification)
export class NotificationEntityRepository
  extends Repository<Notification>
  implements NotificationRepository
{
  async addNotification(notification: Notification): Promise<void> {
    await this.save(notification);
  }

  async updateNotification(notification: Notification): Promise<void> {
    await this.update(notification.id, notification);
  }

  findByUser(user: User): Promise<Notification[]> {
    return this.find({
      where: {
        user_recipient: user,
      },
      order: {
        date_hour: 'DESC',
      },
      relations: [
        'content_linked',
        'user_recipient',
        'user_linked',
      ],
    });
  }

  async hasNotSeenNotificationsByUser(user: User): Promise<boolean> {
    return (
      (await this.count({
        where: {
          user_recipient: user,
          is_seen: false,
        },
      })) > 0
    );
  }

  findNotSeenNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.find({
      where: {
        user_recipient: userId,
        is_seen: false,
      },
    });
  }

  async deleteNotificationByContent(content: Content): Promise<void> {
    await this.delete({ content_linked: content });
  }

  async deleteFollowDemandNotificationByUserAndFollower(
    user: User,
    follower: User,
  ): Promise<void> {
    await this.delete({
      user_linked: follower,
      user_recipient: user,
      notification_type: NotificationType.FOLLOW_DEMAND,
    });
  }
}
