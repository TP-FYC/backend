import { User } from 'src/infrastructure/database/model/user.entity';

export interface UserRepository {
  findById(userId: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByName(name: string): Promise<User[]>;
  saveUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;
}
