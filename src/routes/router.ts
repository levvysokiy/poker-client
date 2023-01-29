import { Router } from 'express';
import userController from '../controllers/user.controller';
import { handle } from './request-handler';

const router: Router = Router();

router.post('/api/users/register', handle(userController.register));
router.post('/api/users/login', handle(userController.login));
router.post('/api/users/token', handle(userController.getToken));

export default router;
