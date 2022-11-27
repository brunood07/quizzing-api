import { Router } from 'express';

import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';

const usersRoutes = Router();
const createUser = new CreateUserController();

usersRoutes.post('/', createUser.handle);

export { usersRoutes };
