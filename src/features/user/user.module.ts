import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/database/model/user.entity';
import { UserEntityRepository } from 'src/infrastructure/database/shared-repository/user-entity.repository';
import { UpdateUserHandler } from './application/commands/update-user.handler';
import { GetUsersByNameHandler } from './application/query/get-users-by-name.handler';
import { UserController } from './user.controller';
import { GetUsersByIdHandler } from './application/query/get-users-by-id.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User, UserEntityRepository])],
  controllers: [UserController],
  providers: [
    GetUsersByNameHandler,
    UpdateUserHandler,
    GetUsersByIdHandler,
    UserEntityRepository,
  ],
})
export class UserModule {}
