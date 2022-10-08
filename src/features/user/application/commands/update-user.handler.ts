import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntityRepository } from '../../../../infrastructure/database/shared-repository/user-entity.repository';

import { Connection } from 'typeorm';
import { hash } from 'argon2';
import { User } from 'src/infrastructure/database/model/user.entity';
import { UserRepository } from 'src/domain/user.repository';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  private readonly repository: UserRepository;

  constructor(connection: Connection) {
    this.repository = connection.getCustomRepository(UserEntityRepository);
  }

  async execute(command: UpdateUserCommand): Promise<User> {
    const user = new User();
    user.id = command.userId;
    user.password = await hash(command.password);
    user.description = command.description;
    user.user_role = command.userRole;
    user.confidentiality = command.confidentiality;
    user.principal_picture_url = command.principalPictureURL;
    await this.repository.updateUser(user);

    return await this.repository.findById(user.id);
  }
}
