import { Notification } from '../infrastructure/database/model/notification.entity';
import { Content } from '../infrastructure/database/model/content.entity';
import { User } from '../infrastructure/database/model/user.entity';

export interface NotificationRepository {
  addNotification(notification: Notification): Promise<void>;

  updateNotification(notification: Notification): Promise<void>;

  findByUser(user: User): Promise<Notification[]>;

  hasNotSeenNotificationsByUser(user: User): Promise<boolean>;

  findNotSeenNotificationsByUserId(userId: string): Promise<Notification[]>;

  deleteNotificationByContent(content: Content): Promise<void>;

  deleteFollowDemandNotificationByUserAndFollower(
    user: User,
    follower: User,
  ): Promise<void>;
}
