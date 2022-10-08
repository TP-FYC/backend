import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ContentController } from './content.controller';
import { ContentEntityRepository } from './db/content-entity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../../infrastructure/database/model/content.entity';
import { CreateContentHandler } from './application/commands/create-content.handler';
import { UpdateContentHandler } from './application/commands/update-content.handler';
import { DeleteContentHandler } from './application/commands/delete-content.handler';
import { GetPublicationsByUserIdHandler } from './application/query/get-publications-by-user-id.handler';
import { GetFollowingPublicationsByUserIdHandler } from './application/query/get-following-publications-by-user-id.handler';
import { GetContentByIdHandler } from './application/query/get-content-by-id.handler';
import { GetResponsesToContentByIdHandler } from './application/query/get-responses-to-content-by-id.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Content, ContentEntityRepository]),
  ],
  controllers: [ContentController],
  providers: [
    CreateContentHandler,
    UpdateContentHandler,
    DeleteContentHandler,
    GetPublicationsByUserIdHandler,
    GetFollowingPublicationsByUserIdHandler,
    GetContentByIdHandler,
    GetResponsesToContentByIdHandler,
    ContentEntityRepository,
  ],
})
export class ContentModule {}
