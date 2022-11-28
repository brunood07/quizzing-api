import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { addDays } from '../../../../helpers/Date';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secretRefreshToken) as IPayload;

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

    const refreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: String(sub),
      expiresIn: auth.expiresInRefreshToken
    });

    const expiresDate = addDays(auth.expiresRefreshTokenDays);

    await this.usersTokensRepository.create({
      expiresDate,
      refreshToken,
      userId
    });

    const newToken = sign({}, auth.secretToken, {
      subject: String(userId),
      expiresIn: auth.expiresInToken
    });

    return {
      refreshToken,
      token: newToken
    };
  }
}

export { RefreshTokenUseCase };
