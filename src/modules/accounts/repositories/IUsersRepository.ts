import { User } from '@prisma/client';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByDocument(document: string): Promise<User | null>;
}

export { IUsersRepository };
