import { getUserFromToken } from '../utils';
import { IContext } from './context.types';

export default async function processContext(context: IContext) {
  const user = await getUserFromToken(context);
  return {
    ...context,
    user,
  };
}
