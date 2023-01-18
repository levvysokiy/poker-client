import { IUser } from '../models/user';

export interface IContext {
  req: any;
  res: any;
  user?: Partial<IUser>;
  authRequired?: boolean;
  authError?: boolean;
}
