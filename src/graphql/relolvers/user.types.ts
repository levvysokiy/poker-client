import { IUserInput } from '../../models/user';

export type TCreateUserPayload = {
  userInput: IUserInput;
};

export type TUserByIdPayload = {
  id: string;
};
