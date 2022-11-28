import 'reflect-metadata';

import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { AppError } from '../../../../shared/errors/AppError';

let createUser: CreateUserUseCase;
let authenticateUser: AuthenticateUserUseCase;
let usersRespository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;

describe('Authenticate a user', () => {
  beforeEach(async () => {
    usersRespository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    createUser = new CreateUserUseCase(usersRespository);
    authenticateUser = new AuthenticateUserUseCase(
      usersRespository,
      usersTokensRepository
    );

    await createUser.execute({
      firstName: 'Teste',
      lastName: 'User',
      email: 'teste@teste.com',
      dateOfBirth: '01/01/1969',
      document: '11111111111',
      password: 'teste123',
      phoneNumber: '13981626268',
      score: 0
    });
  });

  it('Should be able to authentica a user', async () => {
    const auth = await authenticateUser.execute({
      email: 'teste@teste.com',
      password: 'teste123'
    });

    expect(auth).toHaveProperty('token');
    expect(auth).toHaveProperty('refreshToken');
  });

  it('should not be able to authenticate a user with an unregistered email', async () => {
    await expect(
      authenticateUser.execute({
        email: 'teste2@teste.com',
        password: 'teste123'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should not be able to authenticate a user with an incorrect password', async () => {
    await expect(
      authenticateUser.execute({
        email: 'teste@teste.com',
        password: '123'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
