/**
 * The database access for user filters
 * Note: all functions should return promises - error handling should be left to caller
 */

const mysql = require('promise-mysql');

const MYSQLDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

module.exports = {
  getUserFilter(id) {
    return mysql.createConnection(MYSQLDB)
      .then((conn) => {
        const query = mysql.format(`
          SELECT
            AF.MinAge AS minAge,
            AF.MaxAge AS maxAge
          FROM AgeFilter AF
          WHERE AF.UserID = ?
        `, [id]);

        const rows = conn.query(query);
        conn.end();
        return rows;
      });
  },

  saveUserFilter(id, filter) {
    return mysql.createConnection(MYSQLDB)
      .then((conn) => {
        let result = conn.query(`
          INSERT INTO AgeFilter (UserID, MinAge, MaxAge)
          VALUES (?, ?, ?) 
          ON DUPLICATE KEY UPDATE MinAge = ?, MaxAge = ?;
        `, 
          [id, 
          filter.age.minAge, 
          filter.age.maxAge, 
          filter.age.minAge, 
          filter.age.maxAge]);

        conn.end();
        return result;
      });
  }
};