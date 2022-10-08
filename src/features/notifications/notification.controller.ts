import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetNotificationByUserIdRequest } from './dto/request/get-notifications-by-user-id-request.dto';
import { GetNotificationByUserIdQuery } from './application/query/get-notifications-by-user-id.query';
import { GetNotificationByUserIdResponse } from './dto/response/get-notifications-by-user-id-response-dto';
import { SeeNotificationsOfUserRequest } from './dto/request/see-notifications-of-user-request.dto';
import { SeeNotificationsOfUserCommand } from './application/commands/see-notifications-of-user.command';
import { UserNotFoundException } from '../../shared/exceptions/user-not-found.exception';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  private readonly commandBus: CommandBus;
  private readonly queryBus: QueryBus;

  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    this.commandBus = commandBus;
    this.queryBus = queryBus;
  }

  @Put('/seeAllNotificationsByUserId')
  async seeAllNotificationsByUserId(
    @Body() seeNotificationsOfUserRequest: SeeNotificationsOfUserRequest,
  ) {
    try {
      await this.commandBus.execute(
        SeeNotificationsOfUserCommand.of(seeNotificationsOfUserRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('/getByUserId')
  async getNotificationById(
    @Query() getNotificationByIdUserIdRequest: GetNotificationByUserIdRequest,
  ) {
    try {
      return await this.queryBus.execute<
        GetNotificationByUserIdQuery,
        GetNotificationByUserIdResponse
      >(GetNotificationByUserIdQuery.of(getNotificationByIdUserIdRequest));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
