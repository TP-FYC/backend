import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ContentEntityRepository } from '../../db/content-entity.repository';
import { ContentRepository } from '../../../../domain/content.repository';
import { Connection } from 'typeorm';
import { UpdateContentCommand } from './update-content.command';
import { Content } from '../../../../infrastructure/database/model/content.entity';

@CommandHandler(UpdateContentCommand)
export class UpdateContentHandler
  implements ICommandHandler<UpdateContentCommand>
{
  private readonly repository: ContentRepository;

  constructor(connection: Connection) {
    this.repository = connection.getCustomRepository(ContentEntityRepository);
  }

  async execute(command: UpdateContentCommand): Promise<void> {
    const content = new Content();
    content.id = command.contentId;
    content.title = command.title;
    content.content = command.content;

    await this.repository.updateContent(content);
  }
}
