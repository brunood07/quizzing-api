import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import {
  AuthenticateUserData,
  AuthenticateUserResponse
} from '../../dtos/AuthenticateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../shared/errors/AppError';
import auth from '../../../../config/auth';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';
import { addDays } from '../../../../helpers/Date';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  execute = async ({
    email,
    password
  }: AuthenticateUserData): Promise<AuthenticateUserResponse> => {
    const {
      expiresInToken,
      expiresInRefreshToken,
      secretToken,
      secretRefreshToken
    } = auth;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email or password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('Email or password incorrect');

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken
    });

    const refreshTokenExpiresDate = addDays(expiresInRefreshToken);

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate
    });

    const tokenReturn = {
      token,
      user: {
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email
      },
      refreshToken
    };

    return tokenReturn;
  };
}
