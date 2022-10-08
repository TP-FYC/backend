import { User } from '../../../../infrastructure/database/model/user.entity';

export class GetUsersByIdResponse {
  constructor(user: User) {
    this.user = user;
  }
  readonly user: User;
}
