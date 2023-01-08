import { container } from 'tsyringe';

import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/infra/prisma/repository/UsersRepository';

import { IUsersTokensRepository } from '../../modules/accounts/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '../../modules/accounts/infra/prisma/repository/UsersTokensRepository';

import { IQuizzCategoryRepository } from '../../modules/quizz/repositories/IQuizzCategoryRepository';
import { QuizzCategoryRepository } from '../../modules/quizz/infra/prisma/repository/QuizzCategoryRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);

container.registerSingleton<IQuizzCategoryRepository>(
  'QuizzCategoryRepository',
  QuizzCategoryRepository
);
