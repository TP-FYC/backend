import { GetUsersByNameRequest } from '../../dto/request/get-users-by-name-request.dto';

export class GetUsersByNameQuery {
  public readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
  public static of(
    getUsersByNameRequest: GetUsersByNameRequest,
  ): GetUsersByNameQuery {
    const { name } = getUsersByNameRequest;
    return new GetUsersByNameQuery(name);
  }
}
