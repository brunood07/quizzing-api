import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const payload = req.body;

      const createCategory = container.resolve(CreateCategoryUseCase);
      const response = await createCategory.execute(payload);

      return res.status(201).send(response);
    } catch (err) {
      return res.status(400).send(err);
    }
  };
}
