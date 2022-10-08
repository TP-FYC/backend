import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateReactionToContentRequest } from './dto/request/create-reaction-to-content-request.dto';
import { CreateReactionToContentCommand } from './application/command/create-reaction-to-content.command';
import { DeleteReactionToContentRequest } from './dto/request/delete-reaction-to-content-request.dto';
import { DeleteReactionToContentCommand } from './application/command/delete-reaction-to-content.command';
import { GetUsersWhoReactedToContentRequest } from './dto/request/get-users-who-reacted-to-content-request-dto';
import { GetUsersWhoReactedToContentQuery } from './application/query/get-users-who-reacted-to-content.query';
import { GetUsersWhoReactedToContentResponse } from './dto/response/get-users-who-reacted-to-content-response-dto';
import { ContentNotFoundException } from '../../shared/exceptions/content-not-found.exception';

@ApiTags('userReactToContent')
@Controller('userReactToContent')
export class UserReactToContentController {
  private readonly commandBus: CommandBus;
  private readonly queryBus: QueryBus;

  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    this.commandBus = commandBus;
    this.queryBus = queryBus;
  }

  @Post('/create')
  async createUserReactToContent(
    @Body() createReactionToContentRequest: CreateReactionToContentRequest,
  ) {
    try {
      await this.commandBus.execute(
        CreateReactionToContentCommand.of(createReactionToContentRequest),
      );
    } catch (error) {
      if (error instanceof ContentNotFoundException) {
        throw new ContentNotFoundException();
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Delete('/delete')
  async deleteUserReactToContent(
    @Body() deleteReactionToContentRequest: DeleteReactionToContentRequest,
  ) {
    try {
      await this.commandBus.execute(
        DeleteReactionToContentCommand.of(deleteReactionToContentRequest),
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('/getUsersWhoReactedToContent')
  async getUsersWhoReactedToContent(
    @Query()
    getUsersWhoReactedToContentRequest: GetUsersWhoReactedToContentRequest,
  ) {
    try {
      return await this.queryBus.execute<
        GetUsersWhoReactedToContentQuery,
        GetUsersWhoReactedToContentResponse
      >(
        GetUsersWhoReactedToContentQuery.of(getUsersWhoReactedToContentRequest),
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
