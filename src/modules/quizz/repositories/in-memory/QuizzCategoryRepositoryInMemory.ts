import { QuizzCategory } from '@prisma/client';

import { CreateQuizzCategory } from '@modules/quizz/dtos/CreateQuizzCategory';
import { IQuizzCategoryRepository } from '../IQuizzCategoryRepository';

export class QuizzCategoryRepositoryInMemory
  implements IQuizzCategoryRepository
{
  categories: QuizzCategory[] = [];

  async createCategory(data: CreateQuizzCategory): Promise<QuizzCategory> {
    const category = { id: String(Math.random()), ...data };

    this.categories.push(category);

    return category as any;
  }

  async listCategories(): Promise<QuizzCategory[]> {
    return this.categories;
  }

  async findCategoryByName(name: string): Promise<QuizzCategory> {
    return this.categories.find((category) => category.name === name);
  }

  async updateCategory(id: string, data): Promise<QuizzCategory> {
    const category = this.categories.find((category) => category.id === id);
    const categoryUpdated = { ...category, ...data };
    return categoryUpdated;
  }

  async deleteCategory(id: string): Promise<void> {
    this.categories.filter((category) => category.id !== id);
  }
}
