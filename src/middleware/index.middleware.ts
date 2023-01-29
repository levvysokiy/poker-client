import { Application } from 'express';
import { authentificate } from './token.middleware';
import bodyParser from 'body-parser';
import router from '../routes/router';
import protectedRouter from '../routes/protected-router';

export function middleware(app: Application) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/', router);
  app.use('/', authentificate, protectedRouter);
}
