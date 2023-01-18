import { Sequelize } from 'sequelize';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

type DB = {
  sequelize: Sequelize;
};

const db: DB = {
  sequelize: new Sequelize({
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_NAME,
    port: Number(DB_PORT),
    dialect: 'postgres',
  }),
};

export default db;
