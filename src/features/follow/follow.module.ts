import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FollowController } from './follow.controller';
import { FollowEntityRepository } from './db/follow-entity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateFollowHandler } from './application/commands/create-follow.handler';
import { UpdateFollowHandler } from './application/commands/update-follow.handler';
import { DeleteFollowHandler } from './application/commands/delete-follow.handler';
import { GetFollowByFollowerIdHandler } from './application/query/get-follow-by-follower-id.handler';
import { GetFollowByUserIdHandler } from './application/query/get-follow-by-user-id.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FollowEntityRepository]),
  ],
  controllers: [FollowController],
  providers: [
    CreateFollowHandler,
    UpdateFollowHandler,
    DeleteFollowHandler,
    GetFollowByFollowerIdHandler,
    GetFollowByUserIdHandler,
    FollowEntityRepository,
  ],
})
export class FollowModule {}
