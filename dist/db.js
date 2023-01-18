"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
console.log(process.env);
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
console.log(DB_PASSWORD);
const pool = new pg_1.Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME
});
exports.default = pool;
