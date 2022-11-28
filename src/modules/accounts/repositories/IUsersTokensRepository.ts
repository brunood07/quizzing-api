import { UserTokens } from '@prisma/client';
import {
  ICreateUserTokenDTO,
  ICreateUserTokenResponse
} from '../dtos/CreateUserTokenDTO';

export interface IUsersTokensRepository {
  create({
    expiresDate,
    refreshToken,
    userId
  }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}
