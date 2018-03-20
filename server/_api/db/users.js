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
      const rows = conn.query(`
        SELECT 
          UI.UserID as userID,
          UI.UserName as userName,
          UI.Birthday as userBirthday,
          G.GenderType as userGender,
          UI.Bio as userBio,
          UP.PicturePath as primaryPic 
        FROM UsersInfo UI
          LEFT JOIN UserPicture UP
            ON UI.UserID = UP.UserID
            AND UP.PrimaryPicture
          INNER JOIN GenderType G
            ON UI.GenderID = G.GenderID
        WHERE
          UI.UserID = ?
        `, [id]);

      conn.end();
      return rows;
    });
  },

  getUserID(email) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      const rows = conn.query('SELECT * FROM Users WHERE UserEmail = ?', [email]);
      conn.end();
      return rows;
    });
  }
};
