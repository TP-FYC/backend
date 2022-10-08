import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateFollowCommand } from './application/commands/create-follow.command';
import { UpdateFollowCommand } from './application/commands/update-follow.command';
import { DeleteFollowCommand } from './application/commands/delete-follow.command';
import { GetFollowByFollowerIdQuery } from './application/query/get-follow-by-follower-id.query';
import { CreateFollowRequest } from './dto/request/create-follow-request.dto';
import { UpdateFollowRequest } from './dto/request/update-follow-request.dto';
import { DeleteFollowRequest } from './dto/request/delete-follow-request.dto';
import { GetFollowByFollowerIdRequest } from './dto/request/get-follow-by-follower-id-request.dto';
import { GetFollowByFollowerIdResponse } from './dto/response/get-follow-by-follower-id-response-dto';
import { GetFollowByUserIdRequest } from './dto/request/get-follow-by-user-id-request.dto';
import { GetFollowByUserIdQuery } from './application/query/get-follow-by-user-id.query';
import { GetFollowByUserIdResponse } from './dto/response/get-follow-by-user-id-response-dto';
import { UserNotFoundException } from '../../shared/exceptions/user-not-found.exception';
import { AlreadyFollowedException } from './application/exception/already-followed.exception';
import { CantFollowYourselfException } from './application/exception/cant-follow-yourself.exception';
import {FollowNotFoundException} from "./application/exception/follow-not-found.exception";

@ApiTags('follow')
@Controller('follow')
export class FollowController {
  private readonly commandBus: CommandBus;
  private readonly queryBus: QueryBus;

  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    this.commandBus = commandBus;
    this.queryBus = queryBus;
  }

  @Post('/create')
  async createFollow(@Body() createFollowRequest: CreateFollowRequest) {
    try {
      await this.commandBus.execute(
        CreateFollowCommand.of(createFollowRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      }
      if (error instanceof CantFollowYourselfException) {
        throw new CantFollowYourselfException();
      }
      if (error instanceof AlreadyFollowedException) {
        throw new AlreadyFollowedException();
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Put('/update')
  async updateFollow(@Body() updateFollowRequest: UpdateFollowRequest) {
    try {
      await this.commandBus.execute(
        UpdateFollowCommand.of(updateFollowRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      }
      if (error instanceof FollowNotFoundException) {
        throw new FollowNotFoundException();
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Delete('/delete')
  async deleteFollow(@Body() deleteFollowRequest: DeleteFollowRequest) {
    try {
      await this.commandBus.execute(
        DeleteFollowCommand.of(deleteFollowRequest),
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('/getByFollowerId')
  async getByFollowerId(
    @Query() getFollowByFollowerIdRequest: GetFollowByFollowerIdRequest,
  ) {
    try {
      return await this.queryBus.execute<
        GetFollowByFollowerIdQuery,
        GetFollowByFollowerIdResponse
      >(GetFollowByFollowerIdQuery.of(getFollowByFollowerIdRequest));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('/getByUserId')
  async getByUserId(
    @Query() getFollowByUserIdRequest: GetFollowByUserIdRequest,
  ) {
    try {
      return await this.queryBus.execute<
        GetFollowByUserIdQuery,
        GetFollowByUserIdResponse
      >(GetFollowByUserIdQuery.of(getFollowByUserIdRequest));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
