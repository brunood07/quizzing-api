import { inject, injectable } from 'tsyringe';

import { User } from '@prisma/client';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  execute = async (data: CreateUserDTO): Promise<User> => {
    const emailExists = await this.usersRepository.findByEmail(data.email);
    const documentExists = await this.usersRepository.findByDocument(
      data.document
    );

    if (emailExists || documentExists) {
      throw new AppError('Client already exists');
    }

    const userRegister = await this.usersRepository.create(data);

    return userRegister;
  };
}
