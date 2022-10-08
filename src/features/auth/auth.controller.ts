import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequest } from 'src/features/auth/dto/request/login-request.dto';
import { LoginResponse } from 'src/features/auth/dto/response/login-response-dto';
import { LoginCommand } from './application/commands/login.command';
import { RegisterCommand } from './application/commands/register.command';
import { PasswordsDoesNotMatch } from './application/exception/password-does-not-match.exception';
import { RegisterRequest } from './dto/request/register-request.dto';
import { UserNotFoundException } from '../../shared/exceptions/user-not-found.exception';
import { MailAlreadyExistsException } from './application/exception/mail-already-exists.exception';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly commandBus: CommandBus;
  private readonly queryBus: QueryBus;

  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    this.commandBus = commandBus;
    this.queryBus = queryBus;
  }

  @Post('/login')
  async login(@Body() loginRequest: LoginRequest) {
    try {
      return await this.commandBus.execute<LoginCommand, LoginResponse>(
        LoginCommand.of(loginRequest),
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException();
      }
      if (error instanceof PasswordsDoesNotMatch) {
        throw new PasswordsDoesNotMatch();
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Post('/register')
  async function(@Body() registerRequest: RegisterRequest) {
    try {
      await this.commandBus.execute<RegisterCommand, void>(
        RegisterCommand.of(registerRequest),
      );
    } catch (error) {
      if (error instanceof MailAlreadyExistsException) {
        throw new MailAlreadyExistsException();
      }
      console.error(error);
      throw new BadRequestException();
    }
  }
}
