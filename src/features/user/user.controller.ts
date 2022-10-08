import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetUsersByNameRequest } from './dto/request/get-users-by-name-request.dto';
import { GetUsersByNameQuery } from './application/query/get-users-by-name.query';
import { GetUsersByNameResponse } from './dto/response/get-users-by-name-response.dto';
import { UpdateUserRequest } from './dto/request/update-user-request.dto';
import { UpdateUserCommand } from './application/commands/update-user.command';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUsersByIdRequest } from './dto/request/get-users-by-id-request.dto';
import { GetUsersByIdQuery } from './application/query/get-users-by-id.query';
import { GetUsersByIdResponse } from './dto/response/get-users-by-id-response.dto';
import { UpdateUserResponse } from './dto/response/update-user-response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly commandBus: CommandBus;
  private readonly queryBus: QueryBus;

  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    this.commandBus = commandBus;
    this.queryBus = queryBus;
  }

  @Get('/getById')
  async getById(@Query() getUsersByIdRequest: GetUsersByIdRequest) {
    try {
      return await this.queryBus.execute<
        GetUsersByIdQuery,
        GetUsersByIdResponse
      >(GetUsersByIdQuery.of(getUsersByIdRequest));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('/getByName')
  async getByName(@Query() getUsersByNameRequest: GetUsersByNameRequest) {
    try {
      return await this.queryBus.execute<
        GetUsersByNameQuery,
        GetUsersByNameResponse
      >(GetUsersByNameQuery.of(getUsersByNameRequest));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Put('/update')
  async update(@Body() updateUserRequest: UpdateUserRequest) {
    try {
      return await this.commandBus.execute<
        UpdateUserCommand,
        UpdateUserResponse
      >(UpdateUserCommand.of(updateUserRequest));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
