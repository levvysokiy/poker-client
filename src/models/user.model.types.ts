export interface IUserTokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  id: string;
  userName: string;
  password: string;
  chipCount: number;
  accessToken?: string;
  refreshToken?: string;
}

export interface IUserReqBody extends Pick<IUser, 'userName' | 'password'> {}
