import { Model, DataTypes, Optional, UUID } from 'sequelize';
import { DEFAULT_CHIP_COUNT } from '../const';
import db from '../db';

export interface IUser {
  id: string;
  userName: string;
  password: string;
  chipCount: number;
  token?: string;
}

export interface IUserInput extends Optional<IUser, 'id' | 'chipCount'> {}

export interface IUserOutput extends IUser {}

class User extends Model<IUser, IUserInput> {
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
