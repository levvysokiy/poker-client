import { Router } from 'express';
import userRoutes from './user.route';

const router: Router = Router();

const routes: ((router: Router) => void)[] = [userRoutes];

routes.forEach((route) => route(router));

export default router;
