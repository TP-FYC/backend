import { Follow } from '../../../../infrastructure/database/model/follow.entity';

export class GetFollowByFollowerIdResponse {
  constructor(follow: Follow[]) {
    this.follow = follow;
  }

  readonly follow: Follow[];
}
