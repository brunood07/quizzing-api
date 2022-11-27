import 'reflect-metadata';

import { CreateUserUseCase } from './CreateUserUseCase';
import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';

let createUser: CreateUserUseCase;
let usersRepository: UsersRepositoryInMemory;

describe('Create a new user', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUser = new CreateUserUseCase(usersRepository);
  });

  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      firstName: 'Teste',
      lastName: 'User',
      email: 'teste@teste.com',
      dateOfBirth: '01/01/1969',
      document: '11111111111',
      password: 'teste123'
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user if the document is already being used', async () => {
    await createUser.execute({
      firstName: 'Teste',
      lastName: 'User',
      email: 'teste@teste.com',
      dateOfBirth: '01/01/1969',
      document: '11111111111',
      password: 'teste123'
    });

    await expect(
      createUser.execute({
        firstName: 'Teste',
        lastName: 'User',
        email: 'teste2@teste.com',
        dateOfBirth: '01/01/1969',
        document: '11111111111',
        password: 'teste123'
      })
    ).rejects.toEqual(new AppError('Client already exists'));
  });

  it('Should not be able to create a new user if the email is already being used', async () => {
    await createUser.execute({
      firstName: 'Teste',
      lastName: 'User',
      email: 'teste@teste.com',
      dateOfBirth: '01/01/1969',
      document: '11111111111',
      password: 'teste123'
    });

    await expect(
      createUser.execute({
        firstName: 'Teste',
        lastName: 'User',
        email: 'teste@teste.com',
        dateOfBirth: '01/01/1969',
        document: '11111111112',
        password: 'teste123'
      })
    ).rejects.toEqual(new AppError('Client already exists'));
  });
});
