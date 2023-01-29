export interface IToken {
  id: string;
  userId: string;
  token: string;
  revoked: boolean;
}

export interface ITokenBody extends Omit<IToken, 'id' | 'revoked'> {}
