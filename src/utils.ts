import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from './const';
import { IContext } from './graphql/context.types';
import jwt from 'jsonwebtoken';
import { IUser } from './models/user';

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);

  return bcrypt.hash(password, salt);
}

export async function isPasswordCorrect(input: string, password: string) {
  return bcrypt.compare(input, password);
}

export async function getUserFromToken({
  req,
}: IContext): Promise<Partial<IUser> | null> {
  try {
    const authorization: string | undefined = req.headers['authorization'];
    if (!authorization) return null;

    const token = authorization.split(' ')[1];

    if (!token) return null;
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    console.log(user);

    if (!user) return null;

    return user as IUser;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export function checkAuth(context: IContext) {
  context.authRequired = true;
  if (!context.user) throw new AuthenticationError('Unauthorized!');
}
