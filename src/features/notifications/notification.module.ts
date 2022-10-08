import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationController } from './notification.controller';
import { NotificationEntityRepository } from './db/notification-entity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../../infrastructure/database/model/notification.entity';
import { GetNotificationByUserIdHandler } from './application/query/get-notifications-by-user-id.handler';
import { UserReactToContentEntityRepository } from '../user-react-to-content/db/user-react-to-content-entity.repository';
import {SeeNotificationsOfUserHandler} from "./application/commands/see-notifications-of-user.handler";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Notification, NotificationEntityRepository]),
  ],
  controllers: [NotificationController],
  providers: [
    SeeNotificationsOfUserHandler,
    GetNotificationByUserIdHandler,
    NotificationEntityRepository,
    UserReactToContentEntityRepository,
  ],
})
export class NotificationModule {}
