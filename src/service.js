const http = require('http');
const queryString = require("querystring");
const Router = require("router");
const finalhandler = require("finalhandler");
const mysql = require("../async-mysql");

const router = Router();
const pool = mysql.createPool({
  host: process.env.mysql_host,
  user: process.env.mysql_user,
  password: process.env.mysql_password,
  database: process.env.mysql_database,
  port: process.env.mysql_port,
  connectionLimit: process.env.mysql_limit,
  supportBigNumbers: true,
  bigNumberStrings: true,
  dateStrings: true
});
