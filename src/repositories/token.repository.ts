import { Repository } from './base.repository';
import Token from '../models/token.model';
import { IToken } from '../models/token.model.types';

class TokenRepository extends Repository<IToken> {
  static instance: TokenRepository;

  constructor() {
    super(Token);
  }

  static getInstance() {
    if (!TokenRepository.instance) {
      TokenRepository.instance = new TokenRepository();
    }
    return TokenRepository.instance;
  }
}

export default TokenRepository.getInstance();
