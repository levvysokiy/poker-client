import { Model, DataTypes } from 'sequelize';
import db from '../db';
import { IToken, ITokenBody } from './token.model.types';

class Token extends Model<IToken, ITokenBody> {
  public id!: string;
  public userId!: string;
  public token!: string;
  public revoked!: boolean;
}

Token.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
    },
    token: {
      type: DataTypes.TEXT,
    },
    revoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: 'Token',
  }
);

export default Token;
