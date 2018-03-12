/**
 * The database access for users
 * Note: all functions should return promises - error handling should be left to caller
 */

const mysql = require('promise-mysql');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

module.exports = {
  getUsers() {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const rows = conn.query('SELECT * FROM UsersInfo');
      conn.end();
      return rows;
    });
  },

  getUser(id) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const rows = conn.query('SELECT * FROM UsersInfo WHERE UserID = ?', [id]);
      conn.end();
      return rows;
    });
  }
};
