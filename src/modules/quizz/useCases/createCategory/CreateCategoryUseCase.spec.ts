import 'reflect-metadata';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { QuizzCategoryRepositoryInMemory } from '../../repositories/in-memory/QuizzCategoryRepositoryInMemory';
import { AppError } from '../../../../shared/errors/AppError';

let createCategory: CreateCategoryUseCase;
let categoryRepository: QuizzCategoryRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoryRepository = new QuizzCategoryRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoryRepository);
  });

  it('should be able to create a category', async () => {
    const category = { name: 'Test Category' };
    const response = await createCategory.execute(category);

    expect(response).toHaveProperty('id');
  });

  it('should not be able to create a category with a registered name', async () => {
    await createCategory.execute({ name: 'Test Category' });

    await expect(
      createCategory.execute({ name: 'Test Category' })
    ).rejects.toEqual(new AppError('Category already exists!'));
  });
});
