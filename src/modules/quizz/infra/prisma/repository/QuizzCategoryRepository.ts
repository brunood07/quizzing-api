import { QuizzCategory } from '@prisma/client';

import { prisma } from '../../../../../config/database/db';
import { CreateQuizzCategory } from '../../../dtos/CreateQuizzCategory';
import { IQuizzCategoryRepository } from '../../../repositories/IQuizzCategoryRepository';

export class QuizzCategoryRepository implements IQuizzCategoryRepository {
  async createCategory(data: CreateQuizzCategory): Promise<QuizzCategory> {
    const createCategory = await prisma.quizzCategory.create({ data });
    return createCategory;
  }

  async listCategories(): Promise<QuizzCategory[]> {
    const categories = await prisma.quizzCategory.findMany();
    return categories;
  }

  async findCategoryByName(name: string): Promise<QuizzCategory> {
    const category = await prisma.quizzCategory.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    });

    return category;
  }

  async updateCategory(
    id: string,
    data: CreateQuizzCategory
  ): Promise<QuizzCategory> {
    throw new Error('Method not implemented.');
  }

  async deleteCategory(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
