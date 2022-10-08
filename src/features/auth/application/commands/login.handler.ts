import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntityRepository } from '../../../../infrastructure/database/shared-repository/user-entity.repository';
import { LoginCommand } from './login.command';
import { verify } from 'argon2';
import { Connection } from 'typeorm';
import { LoginResponse } from '../../dto/response/login-response-dto';
import { UserNotFoundException } from 'src/shared/exceptions/user-not-found.exception';
import { UserRepository } from 'src/domain/user.repository';
import { JwtService } from '@nestjs/jwt';
import { PasswordsDoesNotMatch } from '../exception/password-does-not-match.exception';
import { NotificationRepository } from '../../../../domain/notification.repository';
import { NotificationEntityRepository } from '../../../notifications/db/notification-entity.repository';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  private readonly userRepository: UserRepository;
  private readonly notificationRepository: NotificationRepository;
  private readonly jwtService: JwtService;

  constructor(connection: Connection, jwtService: JwtService) {
    this.userRepository = connection.getCustomRepository(UserEntityRepository);
    this.notificationRepository = connection.getCustomRepository(
      NotificationEntityRepository,
    );
    this.jwtService = jwtService;
  }

  async execute(command: LoginCommand): Promise<LoginResponse> {
    const { email, password } = command;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }

    const hasNotifications =
      await this.notificationRepository.hasNotSeenNotificationsByUser(user);

    const passwordMatched = await verify(user.password, password);
    if (!passwordMatched) {
      throw new PasswordsDoesNotMatch();
    }

    const token = this.jwtService.sign({ userId: user.id });
    return new LoginResponse(token, user, hasNotifications);
  }
}
