import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/user.model.types';
import { AuthUtils } from '../utils/auth.util';

export async function authentificate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader: string | undefined = req.headers['authorization'];

  const token: string | undefined = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).send('Unauthorized: Token is not provided!');

  try {
    const user: IUser | null = (await AuthUtils.verifyAccessToken(
      token
    )) as IUser;

    req.user = user;

    next();
  } catch (error) {
    return res.status(403).send('Forbidden: Token in not verified!');
  }
}
