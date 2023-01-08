import { QuizzCategory } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { CreateQuizzCategory } from '../../dtos/CreateQuizzCategory';
import { IQuizzCategoryRepository } from '../../repositories/IQuizzCategoryRepository';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('QuizzCategoryRepository')
    private quizzCategory: IQuizzCategoryRepository
  ) {}

  execute = async (data: CreateQuizzCategory): Promise<QuizzCategory> => {
    const { name } = data;

    const categoryExists = await this.quizzCategory.findCategoryByName(name);

    if (categoryExists) {
      throw new AppError('Category already exists!');
    }

    const newCategory = await this.quizzCategory.createCategory(data);

    return newCategory;
  };
}
