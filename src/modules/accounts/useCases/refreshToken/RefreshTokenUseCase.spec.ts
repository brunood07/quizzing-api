import { AppError } from '../../../../shared/errors/AppError';
import 'reflect-metadata';

import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

let createUser: CreateUserUseCase;
let authenticateUser: AuthenticateUserUseCase;
let usersRespository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let refreshTokenService: RefreshTokenUseCase;

describe('Refresh token', () => {
  beforeEach(async () => {
    usersRespository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    createUser = new CreateUserUseCase(usersRespository);
    refreshTokenService = new RefreshTokenUseCase(usersTokensRepository);
    authenticateUser = new AuthenticateUserUseCase(
      usersRespository,
      usersTokensRepository
    );

    await createUser.execute({
      firstName: 'Teste',
      lastName: 'User',
      email: 'teste@teste.com',
      isAdmin: false,
      dateOfBirth: '01/01/1969',
      document: '11111111111',
      password: 'teste123',
      score: 0
    });
  });

  it('Should be able to return a refreshed token', async () => {
    const { refreshToken } = await authenticateUser.execute({
      email: 'teste@teste.com',
      password: 'teste123'
    });

    const refreshedToken = await refreshTokenService.execute(refreshToken);

    expect(refreshedToken).toHaveProperty('token');
    expect(refreshedToken).toHaveProperty('refreshToken');
  });

  it('Should not be able to return a refreshed token with an invalid token', async () => {
    await expect(refreshTokenService.execute('')).rejects.toEqual(
      new AppError('Token not provided!')
    );
  });
});
