import User, { IUser, IUserInput, IUserOutput } from '../models/user';
import { hashPassword, isPasswordCorrect } from '../utils';
import { ApolloError } from 'apollo-server';
import jwt from 'jsonwebtoken';

class UserController {
  static instance: UserController;

  async findById(id: string) {
    return User.findByPk(id);
  }

  async createUser({ userName, password }: IUserInput): Promise<IUserOutput> {
    console.log(userName, password);
    const existingUser = await User.findOne({
      where: { userName },
    });

    if (existingUser) {
      throw new ApolloError('User already exists!');
    }

    const hashedPassword = await hashPassword(password);

    const newUser: IUser = new User({
      userName,
      password: hashedPassword,
    }).dataValues;

    await User.create(newUser);

    const token = await jwt.sign(
      { userName: newUser.userName, id: newUser.id },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: '1h',
      }
    );

    return {
      ...newUser,
      token,
    };
  }

  /*async loginUser({ userName, password }) {
    const user = await User.findOne({
      where: { userName },
    });
    if (!user) throw new ApolloError('User not found!');

    if (!(await isPasswordCorrect(password, user.password)))
      throw new ApolloError('Password is incorrent!');

    

    return user;
  }*/

  static getInstance() {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }
}

export default UserController.getInstance();
