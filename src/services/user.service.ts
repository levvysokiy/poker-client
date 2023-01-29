import { ConflictError } from '../errors/conflict.error';
import { ForbiddenError } from '../errors/forbidden.error';
import { NotFoundError } from '../errors/not-found.error';
import { IToken } from '../models/token.model.types';
import {
  IUserReqBody,
  IUser,
  IUserTokenPair,
} from '../models/user.model.types';
import tokenRepository from '../repositories/token.repository';
import userRepository from '../repositories/user.repository';
import { AuthUtils } from '../utils/auth.util';

class UserService {
  static instance: UserService;

  async register({ userName, password }: IUserReqBody): Promise<IUser> {
    const existingUser: IUser | null = await userRepository.findOne({
      where: { userName },
    });

    if (existingUser) {
      throw new ConflictError('User already exists!');
    }

    const hashedPassword: string = await AuthUtils.hashPassword(password);

    const newUser: IUser = await userRepository.create({
      userName,
      password: hashedPassword,
    });

    const tokenPair: IUserTokenPair = await AuthUtils.createTokenPair({
      id: newUser.id,
      userName: newUser.userName,
    });

    await tokenRepository.create({
      token: tokenPair.refreshToken,
      userId: newUser.id,
    });

    return {
      ...newUser,
      ...tokenPair,
    };
  }

  async login({ userName, password }: IUserReqBody): Promise<IUserTokenPair> {
    const user: IUser | null = await userRepository.findOne({
      where: { userName },
    });

    if (!user) throw new NotFoundError('User not Found!');

    if (!(await AuthUtils.isPasswordCorrect(password, user.password))) {
      throw new ForbiddenError('Password is incorrect!');
    }

    const tokenPair: IUserTokenPair = await AuthUtils.createTokenPair({
      id: user.id,
      userName: user.userName,
    });

    await tokenRepository.create({
      token: tokenPair.refreshToken,
      userId: user.id,
    });

    return tokenPair;
  }

  async getToken(refreshToken: string): Promise<Partial<IUserTokenPair>> {
    const existingToken: IToken | null = await tokenRepository.findOne({
      where: { token: refreshToken },
    });

    if (!existingToken) throw new NotFoundError('Refresh token not found!');

    try {
      const user: IUser | null = (await AuthUtils.verifyRefreshToken(
        refreshToken
      )) as IUser;

      const accessToken: string = await AuthUtils.createAccessToken({
        id: user.id,
        userName: user.userName,
      });

      return {
        accessToken,
      };
    } catch (error) {
      throw new ForbiddenError('Refresh token is invalid!');
    }
  }

  async getCurrentUser(id: string): Promise<IUser | null> {
    return userRepository.findById(id);
  }

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }
}

export default UserService.getInstance();
