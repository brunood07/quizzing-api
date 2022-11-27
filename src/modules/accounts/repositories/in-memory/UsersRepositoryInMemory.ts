import { User } from '@prisma/client';
import { CreateUserDTO } from '../../../../modules/accounts/dtos/CreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  create(data: CreateUserDTO): Promise<User> {
    const user = { id: String(Math.random()), ...data };

    this.users.push(user);

    return user as any;
  }

  findByEmail(email: string): Promise<User | null> {
    const userByEmail = this.users.find((user) => user.email === email);

    return userByEmail as any;
  }

  findByDocument(document: string): Promise<User | null> {
    const userByDocument = this.users.find(
      (user) => user.document === document
    );

    return userByDocument as any;
  }
}
