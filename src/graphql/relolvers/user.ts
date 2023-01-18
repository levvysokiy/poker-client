import UserController from '../../controllers/user';
import { TCreateUserPayload, TUserByIdPayload } from './user.types';
import { IUserOutput } from '../../models/user';
import { IContext } from '../context.types';
import { auth } from '../../middleware/auth';

const userResolver = {
  Query: {
    async userById(_: any, { id }: TUserByIdPayload, context: IContext) {
      return UserController.findById(id);
    },
  },
  Mutation: {
    async createUser(
      _: any,
      { userInput }: TCreateUserPayload
    ): Promise<IUserOutput> {
      return UserController.createUser(userInput);
    },
  },
};

export default userResolver;
