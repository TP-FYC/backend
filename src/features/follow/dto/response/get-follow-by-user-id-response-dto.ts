import { Follow } from '../../../../infrastructure/database/model/follow.entity';

export class GetFollowByUserIdResponse {
  constructor(follow: Follow[]) {
    this.follow = follow;
  }

  readonly follow: Follow[];
}
