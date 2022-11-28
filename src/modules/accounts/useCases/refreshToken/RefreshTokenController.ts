import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const token =
        req.body.token || req.headers['x-access-token'] || req.query.token;

      const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
      const refreshToken = await refreshTokenUseCase.execute(token);

      return res.status(200).json(refreshToken);
    } catch (err) {
      return res.status(400).send('Ocurred some error');
    }
  }
}
