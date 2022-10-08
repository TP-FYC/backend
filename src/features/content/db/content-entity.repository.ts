import { EntityRepository, Repository } from 'typeorm';
import { ContentRepository } from '../../../domain/content.repository';
import { Content } from '../../../infrastructure/database/model/content.entity';
import { ContentType } from '../../../infrastructure/database/model/enums/content-type';
import { User } from '../../../infrastructure/database/model/user.entity';
import { Follow } from '../../../infrastructure/database/model/follow.entity';
import { Program } from 'src/infrastructure/database/model/program.entity';

@EntityRepository(Content)
export class ContentEntityRepository
  extends Repository<Content>
  implements ContentRepository
{
  countResponseByContentId(id: string): Promise<number> {
    return this.count({ where: { parent: id } });
  }
  async addContent(content: Content): Promise<void> {
    await this.save(content);
  }

  async updateContent(content: Content): Promise<void> {
    await this.update(content.id, content);
  }

  async deleteContent(contentId: string): Promise<void> {
    await this.delete(contentId);
  }

  async deleteResponsesByContentId(content: Content): Promise<void> {
    await this.delete({
      parent: content,
    });
  }

  async findById(contentId: string): Promise<Content> {
    return this.manager
      .createQueryBuilder(Content, 'content')
      .select(
        'user.firstname, user.lastname, program.stdin, program.stdout, content.*',
      )
      .innerJoin(User, 'user', 'user.id = content.creator_id')
      .leftJoin(Program, 'program', 'program.id = content.program_id')
      .where('content.id = :contentId', { contentId })
      .getRawOne();
  }

  findResponsesByContentId(contentId: string): Promise<Content[]> {
    return this.manager
      .createQueryBuilder(Content, 'content')
      .select(
        'user.firstname, user.lastname, program.stdin, program.stdout, content.*',
      )
      .innerJoin(User, 'user', 'user.id = content.creator_id')
      .leftJoin(Program, 'program', 'program.id = content.program_id')
      .andWhere('content.parent_id = :contentId', { contentId })
      .orderBy('content.created_at', 'DESC')
      .getRawMany();
  }

  findPublicationsByUserId(userId: string): Promise<any[]> {
    return this.manager
      .createQueryBuilder(Content, 'content')
      .select(
        'user.firstname, user.lastname, program.stdin, program.stdout, content.*',
      )
      .innerJoin(User, 'user', 'user.id = content.creator_id')
      .leftJoin(Program, 'program', 'program.id = content.program_id')
      .where('content.creator_id = :userId', { userId })
      .andWhere('content.parent_id IS NULL')
      .andWhere('content.content_type = :contentType', {
        contentType: ContentType.PUBLICATION,
      })
      .orderBy('content.created_at', 'DESC')
      .getRawMany();
  }

  async findFollowingsByUserId(userId: string): Promise<Content[]> {
    return this.manager
      .createQueryBuilder(Content, 'content')
      .select(
        'user.firstname, user.lastname, program.stdin, program.stdout, content.*',
      )
      .innerJoin(User, 'user', 'user.id = content.creator_id')
      .innerJoin(Follow, 'follow', 'follow.user_id = user.id')
      .leftJoin(Program, 'program', 'program.id = content.program_id')
      .where('follow.follower_id = :userId', { userId })
      .andWhere('content.parent_id IS NULL')
      .andWhere('content.content_type = :contentType', {
        contentType: ContentType.PUBLICATION,
      })
      .orderBy('content.created_at', 'DESC')
      .getRawMany();
  }
}
