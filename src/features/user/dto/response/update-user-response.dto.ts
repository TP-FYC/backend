import { User } from '../../../../infrastructure/database/model/user.entity';

export class UpdateUserResponse {
  constructor(user: User) {
    this.user = user;
  }
  readonly user: User;
}
