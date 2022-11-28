import { container } from 'tsyringe';

import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/infra/prisma/repository/UsersRepository';

import { IUsersTokensRepository } from '../../modules/accounts/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '../../modules/accounts/infra/prisma/repository/UsersTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);
