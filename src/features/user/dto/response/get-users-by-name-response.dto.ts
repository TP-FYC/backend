import { User } from '../../../../infrastructure/database/model/user.entity';

export class GetUsersByNameResponse {
  constructor(users: User[]) {
    this.users = users;
  }
  readonly users: User[];
}
