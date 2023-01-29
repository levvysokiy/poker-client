import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import http from 'http';
import db from './db';
import { middleware } from './middleware/index.middleware';

const app: Application = express();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

middleware(app);

db.sequelize.sync().then(() =>
  server.listen(PORT, () => {
    console.log(`🚀 Server ready at ${PORT}!`);
  })
);
