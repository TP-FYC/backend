import { User } from 'src/infrastructure/database/model/user.entity';

export class LoginResponse {
  constructor(accessToken: string, user: User, hasNotification: boolean) {
    this.accessToken = accessToken;
    this.hasNotifications = hasNotification;
    this.user = user;
  }
  readonly accessToken: string;
  readonly user: User;
  readonly hasNotifications: boolean;
}
