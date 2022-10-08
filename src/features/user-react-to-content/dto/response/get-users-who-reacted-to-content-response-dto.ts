import { User } from '../../../../infrastructure/database/model/user.entity';

export class GetUsersWhoReactedToContentResponse {
  constructor(users: User[]) {
    this.users = users;
  }

  readonly users: User[];
}
