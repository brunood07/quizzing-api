import { Router } from 'express';

import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '../../../../modules/accounts/useCases/refreshToken/RefreshTokenController';
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const createUser = new CreateUserController();
const login = new AuthenticateUserController();
const sessionRefresh = new RefreshTokenController();

usersRoutes.post('/', createUser.handle);
usersRoutes.post('/login', login.handle);
usersRoutes.post('/refresh', sessionRefresh.handle);

export { usersRoutes };
