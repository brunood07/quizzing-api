import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      const authenticateUser = container.resolve(AuthenticateUserUseCase);
      const response = await authenticateUser.execute({ email, password });

      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send('Erro na autenticação');
    }
  };
}
