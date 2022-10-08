import { UserRepository } from 'src/domain/user.repository';
import { User } from 'src/infrastructure/database/model/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserEntityRepository
  extends Repository<User>
  implements UserRepository
{
  findById(userId: string): Promise<User> {
    return this.findOne(userId);
  }

  findByEmail(email: string): Promise<User> {
    return this.findOne({ email: email });
  }

  async saveUser(user: User): Promise<void> {
    await this.save(user);
  }

  findByName(name: string): Promise<User[]> {
    return this.manager
      .createQueryBuilder(User, 'user')
      .select('*')
      .where(
        'UPPER(TEXTCAT("user".firstname, TEXTCAT(\' \', "user".lastname))) LIKE UPPER(:name)',
        {
          name: `%${name}%`,
        },
      )
      .orWhere(
        'UPPER(TEXTCAT("user".lastname, TEXTCAT(\' \', "user".firstname))) LIKE UPPER(:name)',
        {
          name: `%${name}%`,
        },
      )
      .getRawMany();
  }

  async updateUser(user: User): Promise<void> {
    await this.update(user.id, user);
  }
}
