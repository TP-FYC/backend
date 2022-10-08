import { Notification } from 'src/infrastructure/database/model/notification.entity';
import { User } from 'src/infrastructure/database/model/user.entity';
export class GetNotificationByUserIdResponse {
  constructor(notifications: NotificationLightResponse[]) {
    this.notifications = notifications;
  }

  readonly notifications: NotificationLightResponse[];
}

export class NotificationLightResponse {
  readonly id: string;
  readonly date_hour: Date;
  readonly is_seen: boolean;
  readonly content_id: string;
  readonly user_recipient: User;
  readonly user_linked: User;
  readonly notification_type: string;
  constructor(notification: Notification) {
    this.id = notification.id;
    this.date_hour = notification.date_hour;
    this.is_seen = notification.is_seen;
    if (notification.content_linked != null) {
      this.content_id = notification.content_linked.id;
    }
    this.user_recipient = notification.user_recipient;
    this.user_linked = notification.user_linked;
    this.notification_type = notification.notification_type;
  }
}
