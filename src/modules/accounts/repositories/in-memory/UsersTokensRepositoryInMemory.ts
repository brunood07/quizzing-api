import {
  ICreateUserTokenDTO,
  ICreateUserTokenResponse
} from '@modules/accounts/dtos/CreateUserTokenDTO';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: ICreateUserTokenResponse[] = [];

  async create({
    expiresDate,
    refreshToken,
    userId
  }: ICreateUserTokenDTO): Promise<ICreateUserTokenResponse> {
    const userToken = {
      expiresDate,
      refreshToken,
      userId,
      id: String(Math.random()),
      createdAt: new Date()
    };

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<ICreateUserTokenResponse> {
    const userToken = await this.usersTokens.find(
      (userToken) =>
        userToken.userId === user_id && userToken.refreshToken === refresh_token
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = await this.usersTokens.find(
      (userToken) => userToken.id === id
    );
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(
    refresh_token: string
  ): Promise<ICreateUserTokenResponse> {
    const userToken = await this.usersTokens.find(
      (userToken) => userToken.refreshToken === refresh_token
    );

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
