import {
  IUser,
  IUserReqBody,
  IUserTokenPair,
} from '../models/user.model.types';
import { Request } from 'express';
import UserService from '../services/user.service';
import { BadRequestError } from '../errors/bad-request.error';

class UserController {
  static instance: UserController;

  async register(req: Request): Promise<IUser> {
    const body: IUserReqBody = req.body;
    if (!body.userName || !body.password)
      throw new BadRequestError('userName or password are not provided!');

    return UserService.register(body);
  }

  async login(req: Request): Promise<IUserTokenPair> {
    const body: IUserReqBody = req.body;
    if (!body.userName || !body.password)
      throw new BadRequestError('userName or password are not provided!');

    return UserService.login(body);
  }

  async getToken(req: Request): Promise<Partial<IUserTokenPair>> {
    const body: IUser = req.body;

    if (!body.refreshToken)
      throw new BadRequestError('refreshToken are not provided!');

    return UserService.getToken(body.refreshToken);
  }

  async getCurrentUser(req: Request): Promise<IUser | null> {
    return UserService.getCurrentUser(req.user?.id!);
  }

  static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }
}

export default UserController.getInstance();
