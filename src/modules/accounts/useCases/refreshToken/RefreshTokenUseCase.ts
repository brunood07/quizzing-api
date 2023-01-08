import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { addDays } from '../../../../helpers/Date';
import { IPayload, ITokenResponse } from './RefreshToken.types';

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const {
      secretRefreshToken,
      expiresRefreshTokenDays,
      secretToken,
      expiresInToken,
      expiresInRefreshToken
    } = auth;

    if (token === '') {
      throw new AppError('Token not provided!');
    }

    const { email, sub } = verify(token, secretRefreshToken) as IPayload;

    const userId = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token
      );

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: String(sub),
      expiresIn: expiresInRefreshToken
    });

    const expiresDate = addDays(expiresRefreshTokenDays);

    await this.usersTokensRepository.create({
      expiresDate,
      refreshToken,
      userId
    });

    const newToken = sign({}, secretToken, {
      subject: String(userId),
      expiresIn: expiresInToken
    });

    return {
      refreshToken,
      token: newToken
    };
  }
}

export { RefreshTokenUseCase };
