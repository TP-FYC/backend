import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm';
import { NotificationEntityRepository } from '../../db/notification-entity.repository';
import { NotificationRepository } from '../../../../domain/notification.repository';
import { GetNotificationByUserIdQuery } from './get-notifications-by-user-id.query';
import {
  GetNotificationByUserIdResponse,
  NotificationLightResponse,
} from '../../dto/response/get-notifications-by-user-id-response-dto';
import { User } from '../../../../infrastructure/database/model/user.entity';

@QueryHandler(GetNotificationByUserIdQuery)
export class GetNotificationByUserIdHandler
  implements IQueryHandler<GetNotificationByUserIdQuery>
{
  private readonly repository: NotificationRepository;

  constructor(connection: Connection) {
    this.repository = connection.getCustomRepository(
      NotificationEntityRepository,
    );
  }

  async execute(
    query: GetNotificationByUserIdQuery,
  ): Promise<GetNotificationByUserIdResponse> {
    const user = new User();
    user.id = query.userId;
    const notifications = await this.repository.findByUser(user);

    return new GetNotificationByUserIdResponse(
      notifications.map((n) => new NotificationLightResponse(n)),
    );
  }
}
