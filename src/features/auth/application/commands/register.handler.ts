import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntityRepository } from '../../../../infrastructure/database/shared-repository/user-entity.repository';

import { Connection } from 'typeorm';
import { RegisterCommand } from './register.command';
import { RegisterValidator } from 'src/features/auth/domain/registerValidator';
import { hash } from 'argon2';
import { User } from 'src/infrastructure/database/model/user.entity';
import { UserRepository } from 'src/domain/user.repository';
import { MailAlreadyExistsException } from '../exception/mail-already-exists.exception';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  private readonly userRepository: UserRepository;
  private readonly registerValidator: RegisterValidator;

  constructor(connection: Connection, registerValidator: RegisterValidator) {
    this.userRepository = connection.getCustomRepository(UserEntityRepository);
    this.registerValidator = registerValidator;
  }

  async execute(command: RegisterCommand): Promise<void> {
    const foundUser = await this.userRepository.findByEmail(command.email);
    if (foundUser != null) {
      throw new MailAlreadyExistsException();
    }

    this.registerValidator.validate(command);
    const user = new User();
    user.email = command.email;
    user.firstname = command.firstname;
    user.lastname = command.lastname;
    user.description = command.description;
    user.password = await hash(command.password);
    await this.userRepository.saveUser(user);
  }
}
