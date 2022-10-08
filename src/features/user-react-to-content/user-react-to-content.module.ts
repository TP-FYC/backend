import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserReactToContentController } from './user-react-to-content.controller';
import { UserReactToContentEntityRepository } from './db/user-react-to-content-entity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../../infrastructure/database/model/content.entity';
import { CreateReactionToContentHandler } from './application/command/create-reaction-to-content.handler';
import { DeleteReactionToContentHandler } from './application/command/delete-reaction-to-content.handler';
import { GetUsersWhoReactedToContentHandler } from './application/query/get-users-who-reacted-to-content.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Content, UserReactToContentEntityRepository]),
  ],
  controllers: [UserReactToContentController],
  providers: [
    CreateReactionToContentHandler,
    DeleteReactionToContentHandler,
    GetUsersWhoReactedToContentHandler,
    UserReactToContentEntityRepository,
  ],
})
export class UserReactToContentModule {}
