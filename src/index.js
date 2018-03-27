// import * as http from "http";
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

router.get("/login", (req, res) => {
  console.log("11111111");
  console.log({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database,
    port: process.env.mysql_port,
    connectionLimit: process.env.mysql_limit,
  })
  getUser().then((ret) => {
    console.log("33333333333333", ret);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "Content-Type": "text/json" });
    res.write(JSON.stringify(ret));
    res.end()
  }).catch((e) => {
    console.log("33333333333333", e);
  });
});


async function getUser() {
  console.log("666666666666666666666");
  let ret;
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("6666666666666666666661111111111111");
    const sqlRet = await conn.query("SELECT * FROM user WHERE id = ?", ["361511528867557888"]);
    console.log("222222222222", sqlRet);
    if (sqlRet.length !== 0) {
      ret = { code: 200, data: sqlRet[0] };
    } else {
      ret = { code: 200, msg: "not found" };
    }
    return ret;
  } catch (e) {
    throw e;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

const server = http.createServer(function (req, res) {
  router(req, res, finalhandler(req, res))
});
server.listen(5000)
