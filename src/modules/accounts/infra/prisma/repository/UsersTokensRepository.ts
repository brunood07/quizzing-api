import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/CreateUserTokenDTO';
import { prisma } from '@config/database/db';
import { UserTokens } from '@prisma/client';

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    expiresDate,
    refreshToken,
    userId
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await prisma.userTokens.create({
      data: {
        expiresDate,
        refreshToken,
        userId
      }
    });

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens> {
    const usersTokens = await prisma.userTokens.findFirst({
      where: {
        userId: {
          equals: userId
        },
        refreshToken: {
          equals: refreshToken
        }
      }
    });

    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.userTokens.delete({
      where: {
        id: id
      }
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens> {
    const userToken = await prisma.userTokens.findFirst({
      where: {
        refreshToken: {
          equals: refreshToken
        }
      }
    });

    return userToken;
  }
}

export { UsersTokensRepository };
