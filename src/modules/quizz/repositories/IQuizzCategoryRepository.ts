import { QuizzCategory } from '@prisma/client';
import { CreateQuizzCategory } from '../dtos/CreateQuizzCategory';

export interface IQuizzCategoryRepository {
  createCategory(data: CreateQuizzCategory): Promise<QuizzCategory>;
  findCategoryByName(name: string): Promise<QuizzCategory>;
  listCategories(): Promise<QuizzCategory[]>;
  updateCategory(id: string, data: CreateQuizzCategory): Promise<QuizzCategory>;
  deleteCategory(id: string): Promise<void>;
}
