import { Repository } from './base.repository';
import { IUser } from '../models/user.model.types';
import User from '../models/user.model';

class UserRepository extends Repository<IUser> {
  static instance: UserRepository;

  constructor() {
    super(User);
  }

  static getInstance() {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }
}

export default UserRepository.getInstance();
