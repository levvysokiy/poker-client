import { AuthenticationError } from 'apollo-server';
import { IContext } from '../graphql/context.types';

export const auth = (
  resolve: any,
  parent: any,
  args: any,
  context: IContext,
  info: any
) => {
  if (!context.user) throw new AuthenticationError('Unauthorized!');
  resolve(parent, args, context, info);
};
