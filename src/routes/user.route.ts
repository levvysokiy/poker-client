import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { handle } from './request-handler';

const userRoutes = (router: Router) => {
  router.post('/api/users/register', handle(UserController.register));
  router.post('/api/users/login', handle(UserController.login));
  router.post('/api/users/token', handle(UserController.getToken));
  router.get('/api/users/current', handle(UserController.getCurrentUser));
};

export default userRoutes;
