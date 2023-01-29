import { Model, DataTypes } from 'sequelize';
import { DEFAULT_CHIP_COUNT } from '../const';
import db from '../db';
import { IUser, IUserReqBody } from './user.model.types';

class User extends Model<IUser, IUserReqBody> {
  public id!: string;
  public userName!: string;
  public password!: string;
  public chipCount!: number;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    chipCount: {
      type: DataTypes.BIGINT,
      defaultValue: DEFAULT_CHIP_COUNT,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: 'User',
  }
);

export default User;
