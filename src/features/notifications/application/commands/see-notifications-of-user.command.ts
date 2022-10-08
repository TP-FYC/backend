import { SeeNotificationsOfUserRequest } from '../../dto/request/see-notifications-of-user-request.dto';

export class SeeNotificationsOfUserCommand {
  public readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  public static of(
    seeNotificationsOfUserRequest: SeeNotificationsOfUserRequest,
  ): SeeNotificationsOfUserCommand {
    const { userId } = seeNotificationsOfUserRequest;
    return new SeeNotificationsOfUserCommand(userId);
  }
}
