require('dotenv').load();
require('require-sql');
const mysql = require('promise-mysql');
const setupFile = require('./setup.sql');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  rootUser: 'root',
  rootPass: process.env.MYSQL_ROOT_PASS
};

mysql.createConnection({
  host: MYSQLDB.host,
  user: MYSQLDB.rootUser,
  password: MYSQLDB.rootPass
}).then(conn => {
  console.log('---Connected to MYSQL---');
  const res = conn.query('CREATE DATABASE IF NOT EXISTS ??', [MYSQLDB.database]);
  conn.end();
  return res;
}).then(res => {
  console.log(`---Created ${MYSQLDB.database} database---`);
  return mysql.createConnection({
    host: MYSQLDB.host,
    user: 'root',
    password: MYSQLDB.rootPass,
    database: MYSQLDB.database
  });
}).then(conn => {
  console.log(`---Connected to ${MYSQLDB.database} database---`);
  const res = conn.query('CREATE USER IF NOT EXISTS ??@?? IDENTIFIED BY ?;', [MYSQLDB.user, MYSQLDB.host, MYSQLDB.password]);
  conn.end();
  return res;
}).then(res => {
  console.log(`---Created ${MYSQLDB.user} user---`);
  return mysql.createConnection({
    host: MYSQLDB.host,
    user: MYSQLDB.user,
    password: MYSQLDB.password,
    database: MYSQLDB.database,
    multipleStatements: true
  });
}).then(conn => {
  console.log('╔═══════════════════════════╗\n║ Database and User Created ║\n╚═══════════════════════════╝\nBe sure to set your .env file accordingly.');
  console.log('---Building database schemas from setup.sql---');

  conn.query(setupFile);
  return conn.end();
}).then(() => console.log('╔═════════════════════╗\n║ Database initalized ║\n╚═════════════════════╝'))
.catch(err => {
  console.error(err);
});