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
import { GetPublicationsByUserIdRequest } from './dto/request/get-publications-by-user-id-request.dto';
import { GetPublicationsByUserIdQuery } from './application/query/get-publications-by-user-id.query';
import { GetFollowingPublicationsByUserIdQuery } from './application/query/get-following-publications-by-user-id.query';
import { PubicationResponse } from './dto/response/publication-response-dto';
import { GetFollowingPublicationsByUserIdRequest } from './dto/request/get-following-publications-by-user-id-request.dto';
import { GetContentByIdRequest } from './dto/request/get-content-by-id-request.dto';
import { GetContentByIdQuery } from './application/query/get-content-by-id.query';
import { CreateContentRequest } from './dto/request/create-content-request.dto';
import { UpdateContentRequest } from './dto/request/update-content-request.dto';
import { UpdateContentCommand } from './application/commands/update-content.command';
import { DeleteContentRequest } from './dto/request/delete-content-request.dto';
import { GetResponsesToContentByIdRequest } from './dto/request/get-responses-to-content-by-id-request.dto';
import { GetResponsesToContentByIdQuery } from './application/query/get-responses-to-content-by-id.query';
import { CreateContentCommand } from './application/commands/create-content.command';
import { DeleteContentCommand } from './application/commands/delete-content.command';
import { ContentNotFoundException } from '../../shared/exceptions/content-not-found.exception';

@ApiTags('content')
@Controller('content')
export class ContentController {
  private readonly commandBus: CommandBus;
  private readonly queryBus: QueryBus;

  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    this.commandBus = commandBus;
    this.queryBus = queryBus;
  }

  @Post('/create')
  async createContent(@Body() createContentRequest: CreateContentRequest) {
    try {
      await this.commandBus.execute(
        CreateContentCommand.of(createContentRequest),
      );
    } catch (error) {
      if (error instanceof ContentNotFoundException) {
        throw new ContentNotFoundException();
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Put('/update')
  async updateContent(@Body() updateContentRequest: UpdateContentRequest) {
    try {
      await this.commandBus.execute(
        UpdateContentCommand.of(updateContentRequest),
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Delete('/delete')
  async deleteContent(@Body() deleteContentRequest: DeleteContentRequest) {
    try {
      await this.commandBus.execute(
        DeleteContentCommand.of(deleteContentRequest),
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('/getById')
  async getContentById(@Query() getContentByIdRequest: GetContentByIdRequest) {
    try {
      return await this.queryBus.execute<
        GetContentByIdQuery,
        PubicationResponse
      >(GetContentByIdQuery.of(getContentByIdRequest));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('/getPublicationsByUserId')
  async getPublicationsByUserId(
    @Query() getPublicationsByUserIdRequest: GetPublicationsByUserIdRequest,
  ) {
    try {
      return await this.queryBus.execute<
        GetPublicationsByUserIdQuery,
        PubicationResponse
      >(GetPublicationsByUserIdQuery.of(getPublicationsByUserIdRequest));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('/getFollowingPublicationsByUserId')
  async getFollowingPublicationsByUserId(
    @Query()
    getFollowingPublicationsByUserIdRequest: GetFollowingPublicationsByUserIdRequest,
  ) {
    try {
      return await this.queryBus.execute<
        GetFollowingPublicationsByUserIdQuery,
        PubicationResponse
      >(
        GetFollowingPublicationsByUserIdQuery.of(
          getFollowingPublicationsByUserIdRequest,
        ),
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('/getResponsesToContentById')
  async getResponsesToContentById(
    @Query()
    getResponsesToContentByIdRequest: GetResponsesToContentByIdRequest,
  ) {
    try {
      return await this.queryBus.execute<
        GetResponsesToContentByIdQuery,
        PubicationResponse
      >(GetResponsesToContentByIdQuery.of(getResponsesToContentByIdRequest));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
