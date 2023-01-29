import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '../const';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model.types';

export class AuthUtils {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);

    return bcrypt.hash(password, salt);
  }

  static async isPasswordCorrect(
    input: string,
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(input, password);
  }

  static async createAccessToken(payload: Partial<IUser>) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '15m',
    });
  }

  static async createRefreshToken(payload: Partial<IUser>): Promise<string> {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '365d',
    });
  }

  static async createTokenPair(payload: Partial<IUser>) {
    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  static async verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  }

  static async verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
  }
}
